import cache from 'memory-cache'
import request from 'request'

const { User } = require('../models');

// GET -> 로그아웃
const logout = (req, res)=>{
    req.logout();  // req.user객체를 제거하는 역할
    req.session.destroy();  // req.session 객체내용 제거 역할
    res.json({ message : "로그아웃에 성공하였습니다."});
};

// POST -> 폰번호 입력받고 해당 번호로 인증번호 발송
const sendCodeToPhone = (req, res) => {

    // 클라에서 받은 핸드폰번호
    const { phoneNum } = req.body;  //  문자열이었음

    // 서버에서 생성한 인증번호
    const verifyNum = Math.floor(Math.random()*10000000) + 1;

    // 만약 클라에서 입력받은 폰번호가 키값으로 이미 메모리캐시에 올라가져있다면 먼저 있던걸 삭제
    cache.del(phoneNum);

    //phoneNum이라는 key에다가 verifyNum이라는 value를 메모리캐시에 4분동안 저장 / 이후 자동삭제됨
    cache.put(phoneNum, verifyNum, 180000, (key, value) => {
        //Time out callback

    });

    // naver sens에 request 발생시킨다.
    request({
        method: 'POST',
        json: true,
        uri: `https://api-sens.ncloud.com/v1/sms/services/ncp:sms:kr:256928778264:yapp_covey/messages`,
        headers: {
            'Content-Type': 'application/json',
            'X-NCP-auth-key': process.env.SENS_ACCESSKEYID,
            'X-NCP-service-secret': process.env.SENS_SERVICESECRET,
        },
        body: {
            type: 'sms',
            from: '01058509766',
            to: [`${phoneNum}`],
            content: `Covey 가입을 위한 인증번호 ${verifyNum}입니다.`
        }
    });
    return res.json({ message: "인증번호 전송 완료" });
};

// POST -> 사용자가 입력한 인증번호로 인증
const verifyCode  = async (req, res)=> {
    try {

        // 클라에서 이전 요청에서 받았던 폰번호를 현재 요청할 때 끌어와서 쓸 수 있나?
        // 만약 안된다면 사용자가 직접 폰번호를 또 쳐야하는 불편
        const { phoneNum, verifyNumFromClient } = req.body;  // verifyNumFromClient는 문자열
        const verifyNumFromServer = cache.get(phoneNum);

        if (verifyNumFromServer == verifyNumFromClient) {
            await User.update({
                phoneNum: phoneNum,
            }, {
                // where: { id: req.user.id }
                where: { id: 1 }
            });
            res.status(201).json({message : '인증에 성공하였습니다.'});
        } else {
            // 인증번호가 일치하지않을 경우
            // ......
            res.status(503).json({message : '인증에 실패하였습니다.'});
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
};
export { logout, sendCodeToPhone, verifyCode };