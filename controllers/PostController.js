import PostModel from '../models/Post.js'

export const getLastTags = async (req, res) => {
  try {
    const posts = await PostModel.find().limit(5).exec()
    const tags = posts
      .map((obj) => obj.tags)
      .flat()
      .slice(0, 5)
    res.json(tags)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Could not get tags',
    })
  }
}

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
      .populate('user')
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

export const remove = async (req, res) => {
  try {
    const postId = req.params.id

    PostModel.findOneAndDelete({
      _id: postId,
    })
      .then((doc) => {
        if (!doc) {
          return res.status(404).json({
            message: 'Article not found',
          })
        }
        return res.json({
          success: true,
        })
      })
      .catch((err) => {
        console.log(err)
        return res.status(500).json({
          message: 'failed to delete the article',
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
      tags: req.body.tags.split(','),
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

export const update = async (req, res) => {
  try {
    const postId = req.params.id

    await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags,
        user: req.userId,
      }
    )
    res.json({
      success: true,
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Article update failed',
    })
  }
}
