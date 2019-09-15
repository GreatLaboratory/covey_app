import app from "../app"
import request from "supertest"
import should from "should"
import {describe, it} from "mocha";

describe("GET /api/post/findAllPost/:page 요청은", ()=>{
    describe("성공 시", ()=>{
        it('응답이 배열객체 형태로 들어와야하며 객체는 2개가 있어야한다.', (done)=>{
            request(app)
                .get("/api/post/findAllPost/1")
                .expect(200)
                .end((err, res)=>{
                    res.body.should.be.instanceOf(Array).and.have.lengthOf(2);
                    done();
                });
        });
    });
    describe("실패 시", ()=>{
        it('req.params.page가 숫자형이 아니면 400을 응답한다.', (done)=>{
            request(app)
                .get("/api/post/findAllPost/qwqwq")
                .expect(400)
                .end(done)
        });
    });
});

//---------------------------------------------------------------------------------------------------

describe("PUT /api/post/modifyPost/:postId 요청은 ", ()=>{
    describe("성공 시", ()=>{
        it('변경된 게시물은 제목을 정수시로 갖고 있어야한다. ', (done)=> {
            const newTitle = "정수시";
            request(app)
                .put("/api/post/modifyPost/4")
                .send({title: newTitle})
                .expect(201)
                .end((err, res)=>{
                    res.body.should.have.property("title", newTitle);
                    done();
                });
        });
    });
    describe("실패 시", ()=>{
        // 4가 아닌 문자열/ 숫자가 아닌 postId값일 경우 400
        // 빈 객체를 req.body에 넣어서 요청했을 때 400
        // 4가 아닌 777같은 없는 게시물일 때 404
        // 변경하려는 제목이 이미 존재하는 제목일 때 409
    });
});