import express from 'express';
var route = express.Router();
import {getAllCourses,getLecturesByCourseId,createCourse,removeLectureFromCourse,addLectureToCourseById,updateCourseById,deleteCourseById} from '../controller/course.controller.js';
import isloggedIn from '../middleware/isloggedIn.js';
import authorizeRoles from '../middleware/authorizeRoles.js';

import upload from '../middleware/multer.middleware.js';

route.route('/')
    .get(getAllCourses)
    .post(
        isloggedIn,
        authorizeRoles("ADMIN"),
        upload.single("thumbnail"),
        createCourse

    )
    .delete(isloggedIn, authorizeRoles('ADMIN'), removeLectureFromCourse);


    // route.post('/course',isloggedIn,authorizeRoles("ADMIN"),upload.single("thumbnail"),createCourse);
route.route('/:id')
    .get(isloggedIn,getLecturesByCourseId)
    .post(isloggedIn,authorizeRoles('ADMIN'),upload.single("lecture"),addLectureToCourseById)
    .put(isloggedIn, authorizeRoles('ADMIN'), updateCourseById)
    .delete(isloggedIn, authorizeRoles('ADMIN'), deleteCourseById)
export default route;