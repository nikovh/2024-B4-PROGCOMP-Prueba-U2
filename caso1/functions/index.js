const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();

exports.deleteProyecto = functions.https.onCall(async (data, context) => {
  const { projectId } = data;
  try {
    await db.collection("projects").doc(projectId).delete();
    return { message: `Project ${projectId} deleted successfully` };
  } catch (error) {
    throw new functions.https.HttpsError("internal", "Error deleting project");
  }
});
