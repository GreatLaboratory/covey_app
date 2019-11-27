import express from "express"
import {
    findAllPost,
    findPost,
    createPost,
    modifyPost,
    deletePost,
    findPostByUserId,
    findHighPayPost,
    findSameAddressPost,
    duePost,
    findCategoryPost,
} from "../controller/postController"

const router = express.Router();
const { isLoggedIn, upload } = require('./middleWares')


// req.user.id로 로그인된 사용자가 게시한 게시물 목록 조회
router.get("/registerList", isLoggedIn, findPostByUserId);

// 모든 게시물 조회 (+ 페이징 처리)
router.get("/list/:page", findAllPost);

// 고수익 알바 게시물 리스트 조회 (+ 페이징 처리)
router.get("/payList/:page", findHighPayPost);

// 우리 동네 알바 게시물 리스트 조회 (+ 페이징 처리)
router.get("/addressList/:page", findSameAddressPost);

// 해당 카테고리의 게시물 리스트 조회 (+ 페이징 처리)
router.get('/categoryList/:page', findCategoryPost);

// req.params.postId로 해당 게시물 상세 조회
router.get("/:postId", findPost);

// 게시물 등록
router.post("/", isLoggedIn, upload.fields([{ name: 'img1' }, { name: 'img2' }, { name: 'img3' }]), createPost);

// req.params.postId로 해당 게시물 수정
router.put("/:postId", isLoggedIn, upload.fields([{ name: 'img1' }, { name: 'img2' }, { name: 'img3' }]), modifyPost);

// req.params.postId로 해당 게시물 삭제
router.delete("/:postId", isLoggedIn, deletePost);

// req.params.postId로 해당 게시물 마감하기
router.put('/due/:postId', isLoggedIn, duePost);

/**
 * @swagger
 * tags:
 *   name: PostRouter
 *   description: 게시물 관련 api
 * /api/post/list/{page}:
 *   get:
 *     tags:
 *       - PostRouter
 *     summary: 필터링 거친 게시물 리스트 조회 (+페이징) -> 메인-필터링 검색
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: page
 *         in: path
 *         description: 페이지 번호
 *         required: true
 *         type: integer
 *       - name: pay
 *         in: query
 *         description: 시급
 *         required: true
 *         type: integer
 *       - name: category
 *         in: query
 *         description: 업종
 *         required: true
 *         type: array
 *         items:
 *           type: string
 *           enum:
 *             - "식당"
 *             - "카페"
 *             - "술집"
 *             - "편의점"
 *             - "잡화매장"
 *             - "독서실"
 *             - "PC방"
 *             - "기타"
 *       - name: address1
 *         in: query
 *         description: 시
 *         required: true
 *         type: string
 *       - name: address2
 *         in: query
 *         description: 구
 *         required: true
 *         type: string
 *       - name: startDate
 *         in: query
 *         description: 시작날짜 (ex:2019-09-30)
 *         required: true
 *         type: string
 *         format: date
 *       - name: endDate
 *         in: query
 *         description: 끝날짜 (ex:2019-09-30)
 *         required: true
 *         type: string
 *         format: date
 *     responses:
 *       200:
 *         description: 리스트 조회 성공
 *       400:
 *         description: 잘못된 파라미터
 *       404:
 *         description: Not Found
 * /api/post/payList/{page}:
 *   get:
 *     tags:
 *       - PostRouter
 *     summary: 시급 높은 순서대로 게시물 리스트 조회(+페이징) -> 메인-고수익 대타
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: page
 *         in: path
 *         description: 페이지 번호
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: 리스트 조회 성공
 *       400:
 *         description: 잘못된 파라미터
 *       404:
 *         description: Not Found
 * /api/post/addressList/{page}:
 *   get:
 *     tags:
 *       - PostRouter
 *     summary: 주소(시와 구)가 같은 게시물 리스트 조회(+페이징) -> 메인-우리동네 대타
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: page
 *         in: path
 *         description: 페이지 번호
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: 리스트 조회 성공
 *       400:
 *         description: 잘못된 파라미터
 *       404:
 *         description: Not Found
 * /api/post/categoryList/{page}:
 *   get:
 *     tags:
 *       - PostRouter
 *     summary: 선택한 업종과 같은 업종의 게시물 리스트 조회(+페이징) -> 메인-상단 업종 카테고리
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: page
 *         in: path
 *         description: 페이지 번호
 *         required: true
 *         type: integer
 *       - name: category
 *         in: query
 *         description: 업종
 *         required: true
 *         type: array
 *         items:
 *           type: string
 *           enum:
 *             - "식당"
 *             - "카페"
 *             - "술집"
 *             - "편의점"
 *             - "잡화매장"
 *             - "독서실"
 *             - "PC방"
 *             - "기타"
 *     responses:
 *       200:
 *         description: 리스트 조회 성공
 *       400:
 *         description: 잘못된 파라미터
 *       404:
 *         description: Not Found
 * /api/post/{postId}:
 *   get:
 *     tags:
 *       - PostRouter
 *     summary: 대타 게시물 상세정보 조회
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: postId
 *         in: path
 *         description: 게시물 고유 index (primary key)
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: 조회 성공
 *       404:
 *         description: Not Found
 *   put:
 *     tags:
 *       - PostRouter
 *     summary: 대타 게시물 수정하기
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: postId
 *         in: path
 *         description: 게시물 번호
 *         required: true
 *         type: integer
 *       - name: body
 *         in: body
 *         description: |
 *           게시물 수정할 때 request body에 넣어줘야할 json
 *           1. 수정하려는 내용의 key만 선별해서 json작성
 *           2. "id", "userId","img1, 2, 3" 이렇게 5개 key들은 body에서 제외해야함.
 *           3. 날짜는 2019-09-30 이 형식으로
 *           4. workingTime은 11:00 ~ 20:00 이 형식으로
 *           5. address1는 시/도, address2는 구/시, address3는 도로명 및 상세주소 (ex:서울특별시 / 중랑구 / 동일로136길 15)
 *           6. category는 ["식당", "카페", "술집", "편의점", "잡화매장", "독서실", "PC방", "기타"] 중에 하나로
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Post'
 *     responses:
 *       201:
 *         description: 수정 성공
 *       404:
 *         description: Not Found
 *   delete:
 *     tags:
 *       - PostRouter
 *     summary: 대타 게시물 삭제하기
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: postId
 *         in: path
 *         description: 게시물 번호
 *         required: true
 *         type: integer
 *     responses:
 *       204:
 *         description: 삭제 성공
 *       404:
 *         description: Not Found
 * /api/post/registerList:
 *   get:
 *     tags:
 *       - PostRouter
 *     summary: 로그인된 사용자가 게시한 게시물 목록 조회
 *     consumes:
 *       - application/json
 *     responses:
 *       200:
 *         description: 리스트 조회 성공
 *       404:
 *         description: Not Found
 * /api/post:
 *   post:
 *     tags:
 *       - PostRouter
 *     summary: 대타 게시물 등록하기
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         description: |
 *           게시물 등록할 때 request body에 넣어줘야할 json
 *           1. "id", "userId","img1, 2, 3" 이렇게 5개 key들은 body에서 제외해야함.
 *           2. 날짜는 2019-09-30 이 형식으로
 *           3. workingTime은 11:00 ~ 20:00 이 형식으로
 *           4. address1는 시/도, address2는 구/시, address3는 도로명 및 상세주소 (ex:서울특별시 / 중랑구 / 동일로136길 15)
 *           5. category는 ["식당", "카페", "술집", "편의점", "잡화매장", "독서실", "PC방", "기타"] 중에 하나로
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Post'
 *     responses:
 *       201:
 *         description: 등록 성공
 *       400:
 *         description: 잘못된 요청바디
 *       404:
 *         description: Not Found
 *       409:
 *         description: 중복된 제목 충돌
 * /api/post/due/{postId}:
 *   put:
 *     tags:
 *       - PostRouter
 *     summary: 게시물 마감하기
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: postId
 *         in: path
 *         description: 게시물 번호
 *         required: true
 *         type: integer
 *     responses:
 *       201:
 *         description: 마감 성공
 *       404:
 *         description: Not Found
 */
module.exports = router;