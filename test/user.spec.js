import app from "../app"
import request from "supertest"
import should from "should"
import {describe, it} from "mocha";

describe("GET /api/user/findUser/:userId 요청은 ", ()=>{
    describe("성공 시 ", ()=>{
        it('name이 김명관인 user객체를 반환해야한다.', (done)=> {
            request(app)
                .get("/api/user/findUser/1")
                .expect(200)
                .end((err, res)=>{
                    res.body.should.have.property("name", "김명관");
                    done();
                });
        });
    });
    describe("실패 시 ", ()=>{
        it('userId가 숫자형이 아니면 400을 응답한다.', (done)=>{
            request(app)
                .get("/api/user/findUser/qwqwq")
                .expect(400)
                .end(done)
        });
        it('userId로 유저를 찾을 수 없으면 404을 응답한다.', (done)=> {
            request(app)
                .get("/api/user/findUser/1111")
                .expect(404)
                .end(done)
        });
    })
});