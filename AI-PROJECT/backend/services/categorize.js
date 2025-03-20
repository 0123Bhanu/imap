import natural from "natural";

const classifier = new natural.BayesClassifier();

classifier.addDocument("meeting confirmed", "Meeting Booked");
classifier.addDocument("interested in your offer", "Interested");
classifier.addDocument("not interested", "Not Interested");
classifier.addDocument("out of office", "Out of Office");
classifier.addDocument("unsubscribe", "Spam");

classifier.train();

export const categorizeEmail = (text) => classifier.classify(text);
