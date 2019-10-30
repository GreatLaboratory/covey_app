'use strict';

module.exports = {
    swaggerDefinition: {
        // 정보
        info: {
            title: 'Covey Application REST API', // Title (required)
            version: '0.0.1', // Version (required)
            description: 'Endpoints to test the covey application routers'
        },
        // 주소
        host: "localhost:3000",
        // 기본 root path
        // basePath: "/api/",
        // 각 api에서 설명을 기록할 때 사용할 constant들을 미리 등록해놓는것
        components: {
            res: {
                BadRequest: {
                    description: '잘못된 요청',
                    schema: {
                        $ref: '#/components/errorResult/Error'
                    }
                },
                Forbidden: {
                    description: '권한이 없음',
                    schema: {
                        $ref: '#/components/errorResult/Error'
                    }
                },
                NotFound: {
                    description: '없는 리소스 요청',
                    schema: {
                        $ref: '#/components/errorResult/Error'
                    }
                }
            },
            errorResult: {
                Error: {
                    type: 'object',
                    properties: {
                        errMsg: {
                            type: 'string',
                            description: '에러 메시지 전달.'
                        }
                    }
                }
            }
        },
        schemes: ["http"], // 가능한 통신 방식
        definitions:  // 모델 정의
            {
                'User': {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer'
                        },
                        snsId: {
                            type: 'string'
                        },
                        name: {
                            type: 'string'
                        },
                        gender: {
                            type: 'boolean'
                        },
                        age: {
                            type: 'string'
                        },
                        address1: {
                            type: 'string'
                        },
                        address2: {
                            type: 'string'
                        },
                        intro: {
                            type: 'string'
                        },
                        phoneNum: {
                            type: 'string'
                        },
                        img: {
                            type: 'string'
                        },
                    }
                }
            }
    },
    apis: ['./routes/*'], // Path to the API docs
};