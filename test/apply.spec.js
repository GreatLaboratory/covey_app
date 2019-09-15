import app from "../app"
import request from "supertest"
import should from "should"
import {describe, it} from "mocha";

describe('POST api/apply/:postId 요청은 ', ()=>{
    describe('성공 시', ()=>{
        let post = {
            title : "요거프레소",
            workingDate : "2019-09-30",
            workingTime : "14:00-17:00",
            pay : "70000",
            address : "경기도 파주시 영어마을대로 14길",
            dueDate : "2019-09-30",
            description : "추억의 카페",
            category : "RESTAURANT"
        };
        let body;
        before((done)=>{
            request(app)
                .post("/api/post/createPost")
                .send(post)
                .expect(201)
                .end((err, res)=>{
                    body = res.body;
                    done();
                });
        });
        it('id라는 속성을 가지고 있어야한다.', function () {
            body.should.have.property("id")
        });
        it('입력한 title을 반환해야한다.', function () {
            body.should.have.property("title", "요거프레소")
        });
    });
    describe('실패 시', ()=>{
        it('title 파라미터가 누락되었을 시 400을 응답해야한다.', (done)=> {
            request(app)
                .post("/api/post/createPost")
                .send({})
                .expect(400)
                .end(done)
        });
        it('title 파라미터가 중복일 경우 409을 응답해야한다.', (done)=> {
            request(app)
                .post("/api/post/createPost")
                .send({title:"요거프레소"})
                .expect(409)
                .end(done)
        });
    })
});

//-----------------------------------------------------------------------------

describe('DELETE api/apply/cancel/:postId 요청은', ()=>{
    describe('성공 시', ()=> {
        it('204을 응답해야한다.', (done)=> {
            request(app)
                .delete("/api/apply/cancel/4")
                .expect(204)  // applyRouter에서 잠깐 isLoggedIn 없이 돌릴 때에만 코드 통과 / 원래는 403 Forbidden뱉어냄
                .end(done)
        });
    });
    describe('실패 시', ()=> {
        it('권한이 없어서 403을 응답해야한다.', (done)=> {
            request(app)
                .delete("/api/apply/cancel/4")
                .expect(403)
                .end(done)
        });
    });
});
