const { has_assignee: hasAssignee } = require('../../models/sequelize');

const model = require('../../models/sequelize');

const assigneeController = {};

assigneeController.get = async (req, res) => {
    const { issueId } = req.params;
    try {
        const assignees = await hasAssignee.get({
            issueId: issueId,
            model: model,
        });
        res.status(200).json({ result: assignees });
    } catch (e) {
        console.error(e);
        res.status(400).json({ result: false });
    }
};

assigneeController.insert = async (req, res) => {
    const { issueId, assigneeId } = req.body;
    try {
        const result = await hasAssignee.create({
            issue_id: issueId,
            user_id: assigneeId,
        });
        res.status(200).json({ result: result });
    } catch (e) {
        console.error(e);
        res.status(400).json({ result: false });
    }
};
assigneeController.delete = async (req, res) => {
    const { issueId, assigneeId } = req.body;
    try {
        const result = await hasAssignee.destroy({
            where: {
                issue_id: issueId,
                user_id: assigneeId,
            },
        });
        res.status(200).json({ result: result });
    } catch (e) {
        console.error(e);
        res.status(400).json({ result: false });
    }
};

assigneeController.update = async (req, res) => {
    const { issueId, insertAssignee, deleteAssignee } = req.body;
    try {
        const deleteResult = await hasAssignee.delete({
            issueId: issueId,
            deleteAssignees: deleteAssignee,
        });
        const insertObject = insertAssignee.map((value) => ({
            issue_id: issueId,
            user_id: value,
        }));
        const insertResult = await hasAssignee.bulkCreate(insertObject);
        const result = { delete: deleteResult, insert: insertResult.length };
        res.status(200).json({ result: result });
    } catch (e) {
        console.error(e);
        res.status(400).json({ result: false });
    }
};

module.exports = assigneeController;
