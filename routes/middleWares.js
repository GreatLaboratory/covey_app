import multer from 'multer'
import path from 'path'

exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(403).json({ message : "로그인 필요" });
    }
};

exports.isNotLoggedIn = (req, res, next)=> {
    if (!req.isAuthenticated()) {
        next();
    } else {
        res.redirect("/");
    }
};

exports.upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/');
        },
        filename: function (req, file, cb) {
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext) + new Date().valueOf() + ext);
        }
    }),
});