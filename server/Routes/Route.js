const express=require("express");
const router=new express.Router();
const userdb=require("../Model/userSchema");
const bcrypt=require("bcryptjs");


router.post("/register", async(req, res)=>{
    try {
        // console.log(req.body);
        const {
            name,
            email,
            password,
            cpassword,
            role
        } = req.body;

        if (!name || !email || !password || !cpassword || !role) {
            res.status(400).json({
                      error: "All fields must be filled"
            })
        } else{
            const checkUser=await userdb.findOne({
                email
            });

            if (checkUser) {
                res.status(400).json({
                          status: 205,
                          msg: "Email is already registered!"
                })
            }else{
                // console.log("done");

                const newForm = new userdb({
                    name,
                    email,
                    password,
                    cpassword,
                    role
                });

                const updatedUser=await newForm.save();

                res.status(201).json({
                    status: 201,
                    msg: "User Registered successfully done",
                    data: updatedUser
                })
            }
        }
    } catch (error) {
        res.status(400).json({
            error: "Registration failed!"
        })
    }
})



router.post("/login", async(req, res)=>{
    try {
        // console.log(req.body);

        const {
            email,
            password
        } = req.body;

         if (!email || !password) {
                 res.status(400).json({
                      msg: "plz fill all fields"
                 })
        }else{
            // console.log("done");
            const checkUser=await userdb.findOne({email});

            if (!checkUser) {
                res.status(400).json({
                          status: 205,
                          msg: "Email is not registered."
                })
            }else{
                const checkPassword = await bcrypt.compare(password, checkUser.password);

                                        if (!checkPassword) {
                                                  res.status(400).json({
                                                            status: 206,
                                                            msg: "Wrong Password"
                                                  })
                                        }else{
                                            // console.log("done");

                                            const token = await checkUser.generateToken();
                                            // console.log(token);

                                            //generate cookie
                                            res.cookie("auth_token", token, {
                                                httpOnly: true,
                                                secure: true,
                                                maxAge: 24 * 60 * 60 * 1000
                                            })



                                            const result = {
                                                checkUser,
                                                token
                                            }

                                            res.status(201).json({
                                                status: 201,
                                                msg: "Login successffully done",
                                                userData: result
                                            })
                                        }
            }
        }
    } catch (error) {
        res.status(400).json({
            error: 'Login Failed!'
        })
    }
})


module.exports=router;