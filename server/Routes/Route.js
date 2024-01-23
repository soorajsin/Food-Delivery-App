const express=require("express");
const router=new express.Router();
const userdb=require("../Model/userSchema");
const bcrypt=require("bcryptjs");
const authentication=require("../Middleware/Authentication");


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


router.get("/validator", authentication,  async(req, res)=>{
    try {
        // console.log("done");

        if (req.getData) {
            res.status(201).json({
                      msg: "User find successfully done",
                      status: 202,
                      getData: req.getData
            })
       } else {
            res.status(400).json({
                      error: 'Invalid Token'
           })
       }
    } catch (error) {
        res.status(400).json({
            error: `Something went wrong ${error}`
        })
    }
})


router.post("/signOut", authentication, async (req, res) => {
    try {
              // console.log(req.body);

              const user = req.getData;

              if (!user) {
                        res.status(400).json({
                                  error: "Please login first to sign out."
                        })
              } else {
                        // console.log(user);

                        user.tokens = [];

                        const updatedUser = await user.save();

                        res.status(201).json({
                                  msg: "Log Out",
                                  status: 208,
                                  data: updatedUser
                        })

              }
    } catch (error) {
              res.status(400).json({
                        msg: "Log out failed"
              })
    }
})



router.post("/addFood", authentication, async (req, res) => {
    try {
              // console.log(req.body);
              const {
                        editFood
              } = req.body;

              if (!editFood) {
                        res.status(400).json({
                                  error: "Please provide the food data to add."
                        })
              } else {
                        const user = req.getData;

                        if (!user) {
                                  res.status(400).json({
                                            error: "You are not authorized for this action!"
                                  })
                        } else {
                                  // console.log(user);

                                  user.addFood.push(...editFood);

                                  const updatedUser = await user.save();

                                  res.status(201).json({
                                            msg: "Added succesfully done",
                                            status: 203,
                                            data: updatedUser
                                  })
                        }
              }
    } catch (error) {
              res.status(400).json({
                        msg: "Not added food"
              })
    }
})


router.delete("/deleteFood", authentication, async (req, res) => {
    try {
              // console.log(req.body);
              const {
                        addFoodId
              } = req.body;

              if (!addFoodId) {
                        res.status(400).json({
                                  error: "Please provide valid id of the item you want to delete."
                        })
              } else {
                        const user = req.getData;

                        if (!user) {
                                  res.status(400).json({
                                            error: "Invalid token or You have no authorization to perform this operation."
                                  })
                        } else {
                                  // console.log(user);

                                  const entryField = user.addFood.find((addFood) => addFood._id.toString() === addFoodId);

                                  if (!entryField) {
                                            res.status(400).json({
                                                      error: "You can not remove this field from your diet plan.",
                                            })
                                  } else {
                                            // console.log(entryField);

                                            user.addFood = user.addFood.filter((addFood) => addFood._id.toString() !== addFoodId);

                                            const updatedUser = await user.save();

                                            res.status(201).json({
                                                      msg: "Delete data successfully done",
                                                      status: 203,
                                                      data: updatedUser
                                            })
                                  }
                        }
              }
    } catch (error) {
              res.status(400).json({
                        msg: "Delete failed! Please try again later."
              })
    }
})


router.put("/updateFood", authentication, async (req, res) => {
    try {
              const {
                        addFoodId,
                        newFoodName,
                        newFoodPrice,
                        newDescription
              } = req.body;

              if (!addFoodId || !newFoodName || !newFoodPrice || !newDescription) {
                        res.status(400).json({
                                  msg: "Please fill all details",
                        });
              } else {
                        const user = req.getData;

                        if (!user) {
                                  res.status(400).json({
                                            msg: "Invalid User!",
                                  });
                        } else {
                                  const foundFoodIndex = user.addFood.findIndex(
                                            (addFood) => addFood._id.toString() === addFoodId
                                  );

                                  if (foundFoodIndex === -1) {
                                            res.status(400).json({
                                                      msg: "This food is not exist in your menu list!",
                                            });
                                  } else {
                                            // Update the fields of the found food item
                                            user.addFood[foundFoodIndex].fname = newFoodName;
                                            user.addFood[foundFoodIndex].fprice = newFoodPrice;
                                            user.addFood[foundFoodIndex].description = newDescription;

                                            const updatedUser = await user.save();

                                            res.status(201).json({
                                                      msg: "Food details updated successfully",
                                                      status: 204,
                                                      data: updatedUser,
                                            });
                                  }
                        }
              }
    } catch (error) {
              console.error(error);
              res.status(400).json({
                        msg: "Not update",
              });
    }
});


// router.get("/allFood", async (req, res) => {
//     try {
//       const allFood = await userdb.find({}, { addFood: 1, _id: 0 }); // Retrieve addFood field only
//       res.status(200).json({ allFood });
//     } catch (error) {
//       res.status(500).json({ error: "Internal Server Error" });
//     }
// });



router.post("/addToCart", authentication, async (req, res) => {
    try {
            //   console.log(req.body);
              const {
                        addFoodId
              } = req.body;

              if (!addFoodId) {
                        res.status(400).json({
                                  msg: "Please provide all required field"
                        })
              } else {
                        const user = req.getData;

                        if (!user) {
                                  res.status(400).json({
                                            msg: "user not found"
                                  })
                        } else {
                                  // console.log(user);

                                  const entryField = user.addFood.find((addFood) => addFood._id.toString() === addFoodId);

                                  if (!entryField) {
                                            res.status(400).json({
                                                      msg: "not valid id"
                                            })
                                  } else {
                                            // console.log(entryField);

                                            user.addFoodCart.push(entryField);

                                            const updatedUser = await user.save();

                                            res.status(201).json({
                                                      status: 207,
                                                      msg: "oder successfully done",
                                                      data: updatedUser
                                            })
                                  }
                        }
              }
    } catch (error) {
              res.status(400).json({
                        msg: "Oder food failed"
              })
    }
})
  



module.exports=router;