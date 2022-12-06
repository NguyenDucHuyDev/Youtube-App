import express from "express";
import { 
    updateInfoUser,
    returnAllVideoOneUser, 
    updateCoverImageUrl,
    like,
    dislike,
    StatusVideos,
    subscribe,
    allChannelSub
} from "../controllers/user.js";

import { canModify } from "../middleware/canModify.js";
// import {
//   update,
//   deleteUser,
//   getUser,
//   subscribe,
//   unsubscribe,
//   like,
//   dislike,
// } from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();



// Cập nhật ảnh bìa
router.patch("/coverImg/:id", verifyToken, canModify, updateCoverImageUrl);


//like a video
router.patch("/like/:videoId", verifyToken, like);

//dislike a video
router.patch("/dislike/:videoId", verifyToken, dislike)

// subscribe a video
router.patch("/subscribe/:videoId", verifyToken, subscribe)
router.get("/allChannelSub", verifyToken, allChannelSub) 


router.get("/:videoId/status", verifyToken, StatusVideos)

//update user
router.patch("/:id", verifyToken, canModify, updateInfoUser);

// Trả về tất cả video của một người dùng 
router.get("/:id", verifyToken, canModify, returnAllVideoOneUser);

// //delete user
// router.delete("/:id", verifyToken, deleteUser);

// //get a user
// router.get("/find/:id", getUser);



export default router;