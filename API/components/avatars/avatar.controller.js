const { multer, db, error } = require("../../helper");
const upload = multer().single("avatar");
const { Avatar, Course, Content, User } = db;
const random_url = (index) => `https://picsum.photos/id/${index}/500/500`;

exports.create = async (req, res, next) => {
  try {
    await new Promise((resolve, reject) =>
      upload(req, res, (err) => (err ? reject(err) : resolve()))
    );
    const { buffer, mimetype } = req.file;
    const img = {
      data: buffer,
      mime_type: mimetype,
    };
    const av = new Avatar(img);
    return res.json(await av.save());
  } catch (error) {
    next(error);
  }
};
exports.updateImGCourse = async (req, res, next) => {
  try {
    console.log("ok");
    const { _id } = req.user;
    const { title, content } = req.body;
    console.log("content", content, title);
    let conMap = JSON.parse(content)
    let contentss = conMap.map((con) => {
      return {
        text: con.text,
        mean: con.mean,
      };
    });
    const contents = await Content.create(contentss);
    const courses = await Course.create({ title, contents });
    await User.findByIdAndUpdate(_id, { $push: { courses } });
    await new Promise((resolve, reject) =>
      upload(req, res, (err) => (err ? reject(err) : resolve()))
    );
    if (!req.files.length) next(error.fileNotFound);
    const { buffer, mimetype } = req.files[0];
    const img = {
      data: buffer,
      mime_type: mimetype,
    };
    const av = new Avatar(img);
    const result = await av.save();
    const idAvatar = result._id;
    console.log(idAvatar, result._id);
    const avatar = await Course.findByIdAndUpdate(
      { _id: courses._id },
      { avatar: idAvatar }
    );
    res.json(courses.toJSON());
    return;
  } catch (err) {
    console.log(err);
  }
};
exports.updateContentOnCourse = async (req, res, next) => {
  try {
    const { course_id, content } = req.body;

    if (!req.files.length) {
      await Content.deleteMany({ id: {$in:content} });
      const contents = await Content.create(content);
      await Course.findByIdAndUpdate({ id: course_id }, { $pull: { content } });
      res.json( await Course.findByIdAndUpdate(
        { id:course_id },
        { $push: { contents } }
      ))
    }else{
      const { buffer, mimetype } = req.files[0];
      const img = {
        data: buffer,
        mime_type: mimetype,
      };
      await Content.deleteMany({ id: content });
      const contents = await Content.create(content);
      await Course.findByIdAndUpdate({ id: course_id }, { $pull: { content } });

      const av = new Avatar(img);
      const result = await av.save();
      const idAvatar = result._id;
      const avatar = await Course.findByIdAndUpdate(
        { _id: courses._id },
        { avatar: idAvatar }
      );
      res.json( await Course.findByIdAndUpdate(
        { id:{ $in:course_id} },
        { $push: { contents } }
      ))
    }
  } catch (error) {
    next(error);
  }
};
exports.set = async (req, res, next) => {
  try {
    const { _id } = req.user;
    await new Promise((resolve, reject) =>
      upload(req, res, (err) => (err ? reject(err) : resolve()))
    );
    console.log(req.file);
    if (!req.files.length) {
      next(error.fileNotFound);
      return;
    }
    const { buffer, mimetype } = req.files[0];
    const img = {
      data: buffer,
      mime_type: mimetype,
    };
    const av = new Avatar(img);
    const result = await av.save();
    const idAvatar = result._id;
    const user = await User.findByIdAndUpdate(
      _id,
      { avatar: idAvatar },
      { new: true }
    );
    const { hash, avatar, ...userWithoutHash } = user.toJSON();
    res.json({
      ...userWithoutHash,
      avatar: this.getImgUrl(avatar),
    });
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const avatar = await Avatar.findById(req.params.id);
    if (!avatar) next(error.avatarNotFound);

    res.writeHead(200, {
      "Content-Type": avatar.mime_type,
      "Content-Length": avatar.data.length,
    });
    res.end(avatar.data);
  } catch (err) {
    next(err);
  }
};

exports.getImgUrl = (avatarId) => {
  return avatarId
    ? `${process.env.SERVER_URL}/api/avatars/${avatarId.toString()}`
    : `${random_url(randomIntFromInterval(1, 1000))}`;
};

function randomIntFromInterval(min, max) {
  return ~~(Math.random() * (max - min + 1) + min);
}
