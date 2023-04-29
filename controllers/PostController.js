import PostModel from '../models/Post.js'

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate('user').exec()

    res.json(posts)
  } catch (err) {
    console.log(err)

    res.status(500).json({
      message: 'Article failed',
    })
  }
}

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id

    PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: 'after',
      }
    )
      .then((doc) => {
        res.json(doc)
      })
      .catch((err) => {
        console.log(err)
        return res.status(500).json({
          message: 'Could not return article',
        })
      })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Article failed',
    })
  }
}

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId,
    })

    const post = await doc.save()
    res.json(post)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Could not create article',
    })
  }
}
