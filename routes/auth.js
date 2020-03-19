router = require('express').Router();
const jwt = require('jsonwebtoken');
const { authModal } = require('../modal/authmodal')
const tokenVerify = require('../token/tokenVerify');


router.post('/createUser', async (req, res) => {
    try {
        await authModal.insertMany({
            userName: req.body.userName.toLowerCase().trim(),
            displayName: req.body.displayName,
            password: req.body.password,
            userEmail: req.body.userEmail,
            userMobile: req.body.userMobile,
            userId: Math.random().toString(36).slice(2),
        });
        return res.status(200).send({ status: 200, message: "Create User Success!" });
    } catch (error) {
        return res.status(400).send({ status: 400, error: error, message: "Create User Failure!" });
    }
});

router.post('/login', async (req, res) => {
    try {
        var user = await authModal.findOne({ userName: req.body.userName.toLowerCase().trim(), password: req.body.password });
        if (user == null) throw error;
        else {
            const userDetails = {
                token: jwt.sign({ userName: user.userName, email: user.userEmail, displayName: user.displayName }, 'CBOTS', { expiresIn: '1h' }),
            }
            return res.status(200).send({ status: 200, results: userDetails, message: 'Login success !' })
        }
    } catch (error) {
        return res.status(400).send({ status: 400, message: 'Login failure !' })
    }
});

router.get('/', async (req, res) => {
    await tokenVerify(req.headers['access-token']);
    try {
        return res.status(200).send({ status: 200, message: 'Login success !' })
    } catch (error) {
        return res.status(400).send({ status: 400, message: 'Login failure !' })

    }
});


router.delete('/deleteUser/:userName', async (req, res) => {
    const token = req.headers['access-token'];
    try {
        await tokenVerify(token);
        await authModal.deleteOne({ userName: req.params.userName })
        return res.status(200).send({ status: 200, message: "Delete Success!" });
    } catch (error) {
        return res.status(400).send({ status: 400, error: error, message: "Delete Failure!" });

    }
});


router.patch('/updatePassword', async (req, res) => {
    const token = req.headers['access-token']
    try {
        await tokenVerify(token);
        await authModal.updateOne({ userName: req.body.userName, password: req.body.oldPassword }, {
            $set: {
                password: req.body.confirmPassword
            }
        })
        return res.status(200).send({ status: 200, message: "Update Success!" });
    } catch (error) {
        return res.status(400).send({ status: 400, error: error, message: "Update Failure!" });

    }
});

module.exports = router;