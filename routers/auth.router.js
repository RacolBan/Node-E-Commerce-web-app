const router = require("express").Router();
const passport = require("passport");

const CLIENT_URL = "http://localhost:3000/";
router.get("/login/success", (req, res) => {
    if (req.user) {
        res.status(200).json({
            success: true,
            message: "successfull",
            user: req.user,
            //   cookies: req.cookies
        });
    }
});

router.get("/google", passport.authenticate("google", { scope: ["email", "profile"] }));

router.get("/google/callback", passport.authenticate("google"
    , {
        successRedirect: CLIENT_URL,
        failureRedirect: '/login',
        failureMessage: true
    })
);

router.get("/facebook", passport.authenticate("facebook", { scope: ["profile"] }));

router.get(
    "/facebook/callback",
    passport.authenticate("facebook", {
        successRedirect: CLIENT_URL,
        failureRedirect: "/login/failed",
    })
);

module.exports = router