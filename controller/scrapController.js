const { Post, Scrap } = require("../models");

// POST
const scrapPost = async (req, res, next) => {
    try {
        const result = await Scrap.create({
            //userId : req.user.id,
            userId : 1,
            postId : req.params.postId
        });
        res.status(201).json(`${result}개의 게시물이 성공적으로 스크랩되었습니다.`);
    } catch (err) {
        console.error(err);
        next(err);
    }
};

// Get
const findAllScrap = async (req, res, next) => {
    try {
        const result = await Scrap.findAll({
            // where : { userId : req.user.id }
            where : { userId : 1 }
        });
        var post = [];
        for (var i in result) {
            post[i] = await Post.findOne({
                where : { id : result[i].postId } });
        }
        res.json(post);
    } catch (err) {
        console.error(err);
        next(err);
    }
};

// DELETE
const cancelScrap = async (req, res, next) => {
    try {
        const result = await Scrap.destroy({
            where : {
                //userId : req.user.id
                userId : 1,
                postId : req.params.postId
            }
        });
        res.status(201).json(`${result}개의 스크랩 게시물이 성공적으로 삭제되었습니다.`);
    } catch (err) {
        console.error(err);
        next(err);
    }
};

export { scrapPost, findAllScrap, cancelScrap }