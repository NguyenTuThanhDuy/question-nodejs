const aqp = require("api-query-params");
const Question = require("../models/question");
const CsvParser = require("json2csv").Parser;

const getQuestions = async (req, res) => {
  const { filter, skip, limit, sort, projection, population } = aqp(req.query);
  try {
    let total_records = await Question.countDocuments();
    let questions = await Question.find(filter)
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .select(projection)
      .populate(population);
    let resp = {items: questions, total_records: total_records};
    res.status(200).json(resp);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getSelectedQuestions = async (req, res) => {
    const { items } = req.body;
    try {
        const questions = await Question.find({_id: { $in: items } });
        const resp = {items: questions, total_records: questions.length};
        res.status(200).json(resp);
    } catch (error) {
        console.error("Error fetching questions:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

const createQuestion = async (req, res) => {
  const { category, content, parent_category } = req.body;

  try {
    const newQues = new Question({ category, content, parent_category });
    await newQues.save();
    res.status(201).json({ message: "Question created successfully" });
  } catch (error) {
    console.error("Error creating question:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const createQuestions = async (req, res) => {
    const { items } = req.body;
    try {
      await Question.insertMany(items);
      res.status(201).json({ message: "Questions created successfully" });
    } catch (error) {
      console.error("Error creating question:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

const updateQuestion = async (req, res) => {
    const { question_id } = req.params;
    const { category, content, parent_category } = req.body;
    try {
        const result = await Question.findOneAndUpdate(
            { _id: question_id },
            { category: category, content: content, parent_category: parent_category},
            { 
                new: true,
            }
        );
        let resp = { message: "Update question successfully", question: result}
        res.status(200).json(resp);
    } catch (error) {
        console.error("Error updating question:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
const deleteQuestion = async (req, res) => {
  const { filter } = aqp(req.query);
  try {
    await Question.findByIdAndDelete(filter);
    res.status(200).json({ message: "Delete question successfully" });
  } catch (error) {
    console.error("Error deleting question:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteQuestions = async (req, res) => {
    const { items } = req.body;
    try {
      await Question.deleteMany({ _id: items });
      res.status(200).json({ message: "Delete questions successfully" });
    } catch (error) {
      console.error("Error deleting question:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

const exportCSV = async (req, res) => {
    const { items } = req.body;
    try {
        const data = [];
        const questions = items ? await Question.find({_id: { $in: items } }) : await Question.find();

        questions.forEach((obj) => {
            const { category, content, parent_category } = obj;
            data.push({ category, content, parent_category });
        });

        const csvFields = ["Category", "Content", "Parent Category"];
        const csvParser = new CsvParser({ csvFields });
        const csvData = csvParser.parse(data);
        res.setHeader("Content-Type", "text-csv");
        res.setHeader("Content-Disposition", "attachment; filename=data.csv");
        res.status(200).end(csvData);
    } catch (error) {
        console.error("Error export question:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = { 
    createQuestion,
    createQuestions,
    getQuestions,
    deleteQuestion,
    deleteQuestions,
    getSelectedQuestions,
    updateQuestion,
    exportCSV
};
