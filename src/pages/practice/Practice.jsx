import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { TextStaticList } from "../../components/TextStaticList";
import { AnswerStatus } from "../../components/AnswerStatus";
import { ReminderAPI } from "../../api/reminder_api";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CHAPTER_NUMBER } from "../../constant/constants";

export function Practice() {
  // word to be displayed
  const [wordValue, setWordValue] = React.useState("");
  const [wordPinyinValue, setWordPinyinValue] = React.useState("");
  const [meaningValue, setMeaningValue] = React.useState("");
  const [imgPathValue, setImgPathValue] = React.useState("");
  const [textValue, setTextValue] = React.useState([]);
  const [pinyinValue, setPinyinValue] = React.useState([]);
  const [wordIdxValue, setWordIdxValue] = React.useState(0);

  // type practice answer and status
  const [answerValue, setAnswerValue] = React.useState("");
  const [messageValue, setMessageValue] = React.useState("");
  const [answerStatusValue, setAnswerStatusValue] = React.useState(0);

  // all list of available words
  const [wordListValue, setWordListValue] = React.useState([]);
  const [wordPinyinListValue, setWordPinyinListValue] = React.useState([]);
  const [meaningListValue, setMeaningListValue] = React.useState([]);
  const [imgPathListValue, setImgPathListValue] = React.useState([]);
  const [textListValue, setTextListValue] = React.useState([]);
  const [pinyinListValue, setPinyinListValue] = React.useState([]);

  // get all the word list
  React.useEffect(() => {
    ReminderAPI.reminder_data().then((res) => {
      const data = res.data;

      // set list value
      setImgPathListValue(data.img_path_ls);
      setWordListValue(data.word_ls);
      setWordPinyinListValue(data.word_pinyin_ls);
      setMeaningListValue(data.meaning_ls);
      setTextListValue(data.text_ls);
      setPinyinListValue(data.pinyin_ls);

      // set word display value
      if (data.img_path_ls.length > 0) {
        setWordIdxValue(0);
        setImgPathValue(data.img_path_ls[0]);
        setWordValue(data.word_ls[0]);
        setWordPinyinValue(data.word_pinyin_ls[0]);
        setMeaningValue(data.meaning_ls[0]);
        setTextValue(data.text_ls[0]);
        setPinyinValue(data.pinyin_ls[0]);
      }
    });
  }, []);

  const getNextWord = (event) => {
    setMessageValue("");
    setAnswerStatusValue(0);
    if (wordIdxValue + 1 < wordListValue.length) {
      setWordValue(wordListValue[wordIdxValue + 1]);
      setWordPinyinValue(wordPinyinListValue[wordIdxValue + 1]);
      setMeaningValue(meaningListValue[wordIdxValue + 1]);
      setImgPathValue(imgPathListValue[wordIdxValue + 1]);
      setTextValue(textListValue[wordIdxValue + 1]);
      setPinyinValue(pinyinListValue[wordIdxValue + 1]);
      setWordIdxValue(wordIdxValue + 1);
    } else {
      setWordValue(wordListValue[0]);
      setWordPinyinValue(wordPinyinListValue[0]);
      setMeaningValue(meaningListValue[0]);
      setImgPathValue(imgPathListValue[0]);
      setTextValue(textListValue[0]);
      setPinyinValue(pinyinListValue[0]);
      setWordIdxValue(0);
    }
  };

  const getPrevWord = (event) => {
    setMessageValue("");
    setAnswerStatusValue(0);
    if (wordIdxValue - 1 >= 0) {
      setWordValue(wordListValue[wordIdxValue - 1]);
      setWordPinyinValue(wordPinyinListValue[wordIdxValue - 1]);
      setMeaningValue(meaningListValue[wordIdxValue - 1]);
      setImgPathValue(imgPathListValue[wordIdxValue - 1]);
      setTextValue(textListValue[wordIdxValue - 1]);
      setPinyinValue(pinyinListValue[wordIdxValue - 1]);
      setWordIdxValue(wordIdxValue - 1);
    } else {
      setWordValue(wordListValue[wordListValue.length - 1]);
      setWordPinyinValue(wordPinyinListValue[wordListValue.length - 1]);
      setMeaningValue(meaningListValue[wordListValue.length - 1]);
      setImgPathValue(imgPathListValue[wordListValue.length - 1]);
      setTextValue(textListValue[wordListValue.length - 1]);
      setPinyinValue(pinyinListValue[wordListValue.length - 1]);
      setWordIdxValue(wordListValue.length - 1);
    }
  };

  const checkAnswer = (event) => {
    event.preventDefault();
    if (answerValue === wordValue) {
      setMessageValue("Correct!");
      setAnswerStatusValue(1);
    } else {
      setMessageValue("Wrong! Please check again");
      setAnswerStatusValue(-1);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      {/* Navigation Header */}
      <div className="flex items-center justify-between mb-6 px-4">
        <span className="text-lg font-medium text-purple-800 bg-white py-1 px-4 rounded-full shadow-sm">
          {wordIdxValue + 1} / {wordListValue.length}
        </span>
        <div className="flex gap-4">
          <Button onClick={getPrevWord}>
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          <Button onClick={getNextWord}>
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* Left Column - Image */}
        <div className="flex flex-col">
          <Card className="flex-1 border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6 bg-gradient-to-br from-white to-purple-50">
              {imgPathValue ? (
                <img
                  src={require("../../images/chapter" +
                    CHAPTER_NUMBER +
                    "_files/" +
                    imgPathValue)}
                />
              ) : (
                <p>Loading...</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Content */}
        <div className="flex flex-col">
          <Card className="flex-1 border-none shadow-lg bg-white">
            <CardContent className="p-8 space-y-8">
              {/* Word Section */}
              <div>
                <div className="flex items-center justify-between mb-6 bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl">
                  <span className="text-6xl font-medium text-purple-800 hover:scale-110 transition-transform duration-300">
                    {wordValue}
                  </span>
                  <span className="text-2xl text-blue-600 bg-white px-4 py-2 rounded-lg shadow-sm">
                    {wordPinyinValue}
                  </span>
                </div>
                <div className="border-t border-purple-100 pt-4">
                  <h3 className="text-sm text-purple-600 mb-2 font-medium">
                    Meaning:
                  </h3>
                  <p className="text-xl text-gray-700 pl-4">{meaningValue}</p>
                </div>
              </div>

              {/* Type Practice Section */}
              <div className="border-t border-purple-100 pt-6">
                <h3 className="text-sm text-purple-600 mb-4 font-medium">
                  Try to type for practice:
                </h3>
                <form onSubmit={checkAnswer} className="flex gap-3">
                  <input
                    className="flex-1 px-4 py-2 border border-slate-200 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    size="small"
                    onInput={(e) => setAnswerValue(e.target.value)}
                  />
                  <Button
                    variant="outlined"
                    size="small"
                    className="px-4 py-2"
                    type="submit"
                  >
                    CHECK
                  </Button>
                </form>
                {/* Correct/Wrong Message */}
                <AnswerStatus
                  status={answerStatusValue}
                  message={messageValue}
                ></AnswerStatus>
              </div>

              {/* Example Section */}
              <div className="border-t border-purple-100 pt-6">
                <h3 className="text-sm text-purple-600 mb-4 font-medium">
                  Example:
                </h3>
                <div className="space-y-6 bg-gradient-to-br from-white to-blue-50 p-6 rounded-xl">
                  {textValue.map((item, idx) => (
                    <TextStaticList text={item} pinyin={pinyinValue[idx]} />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
