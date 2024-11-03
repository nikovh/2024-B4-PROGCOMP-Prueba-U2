/*
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();

exports.deleteTask = functions.https.onRequest(async (req, res) => {
  const {taskId} = req.params;

  try {
    await db.collection("tasks").doc(taskId).delete();
    res.status(200).send(`Task ${taskId} deleted successfully`);
  } catch (error) {
    res.status(500).send("Error deleting task: " + error.message);
  }
});
*/

const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();

exports.deleteTask = functions.https.onCall(async (data, context) => {
  const {taskId} = data;
  try {
    await db.collection("tasks").doc(taskId).delete();
    return {message: `Task ${taskId} deleted successfully`};
  } catch (error) {
    throw new functions.https.HttpsError("internal", "Error deleting task");
  }
});
