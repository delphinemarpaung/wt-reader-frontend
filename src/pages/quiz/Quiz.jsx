import React from "react";
import Button from "@mui/material/Button";
import { FillBlankAPI } from "../../api/fillblank_api";
import { TextStaticList } from "../../components/TextStaticList";
import { StatusBox } from "../../components/StatusBox";
import { AnswerStatus } from "../../components/AnswerStatus";
import { CHAPTER_NUMBER, MAX_WORD_QUIZ } from "../../constant/constants";

export function Quiz() {
  // word to be displayed
  const [questionIdxValue, setQuestionIdxValue] = React.useState(0);
  const [wordValue, setWordValue] = React.useState("");
  const [wordPinyinValue, setWordPinyinValue] = React.useState("");
  const [meaningValue, setMeaningValue] = React.useState("");
  const [imgPathValue, setImgPathValue] = React.useState("");
  const [textValue, setTextValue] = React.useState([]);
  const [pinyinValue, setPinyinValue] = React.useState([]);

  // score
  const [answerValue, setAnswerValue] = React.useState("");
  const [scoreValue, setScoreValue] = React.useState(0);
  const [countValue, setCountValue] = React.useState(0);
  const [messageValue, setMessageValue] = React.useState("");
  const [answerStatusValue, setAnswerStatusValue] = React.useState(0);

  // all list of available words
  const [wordListValue, setWordListValue] = React.useState([]);
  const [wordPinyinListValue, setWordPinyinListValue] = React.useState([]);
  const [meaningListValue, setMeaningListValue] = React.useState([]);
  const [imgPathListValue, setImgPathListValue] = React.useState([]);
  const [textListValue, setTextListValue] = React.useState([]);
  const [pinyinListValue, setPinyinListValue] = React.useState([]);

  // spaced repetition
  const [wordBinListValue, setWordBinListValue] = React.useState([]);
  const [binWeightListValue, setBinWeightListValue] = React.useState([]);

  // word accuracy
  const [wordCorrectCountListValue, setWordCorrectCountListValue] =
    React.useState([]);
  const [wordTryCountListValue, setWordTryCountListValue] = React.useState([]);

  // All Functions
  // get all the word list
  React.useEffect(() => {
    FillBlankAPI.fill_blank_data().then((res) => {
      const data = res.data;

      // set list value
      setImgPathListValue(data.img_path_ls);
      setWordListValue(data.word_ls);
      setWordPinyinListValue(data.word_pinyin_ls);
      setMeaningListValue(data.meaning_ls);
      setTextListValue(data.text_ls);
      setPinyinListValue(data.pinyin_ls);

      // set spaced repetition
      const word_bin_ls = [];
      const word_try_count_ls = [];
      const word_correct_count_ls = [];
      const bin_weight_ls = [0, 0, 0, 0, 0];
      for (let i = 0; i < data.word_ls.length; i++) {
        word_bin_ls.push(0);
        word_try_count_ls.push(0);
        word_correct_count_ls.push(0);
        bin_weight_ls[0] += 1;
      }
      setWordBinListValue(word_bin_ls);
      setWordCorrectCountListValue(word_correct_count_ls);
      setWordTryCountListValue(word_try_count_ls);
      setBinWeightListValue(bin_weight_ls);
    });
  }, []);

  function weighted_random_choice(weights) {
    var i;

    const weight_acc = [];
    let acc = 0;
    for (i = 0; i < weights.length; i++) {
      acc += weights[i];
      weight_acc.push(acc);
    }
    if (acc === 0) {
      return -1;
    }

    var random = Math.random() * weight_acc[weight_acc.length - 1];

    for (i = 0; i < weight_acc.length; i++) if (weight_acc[i] > random) break;

    return i;
  }

  async function getWordAsync() {
    // get question id by space repetition sampling
    const binIdx = weighted_random_choice(binWeightListValue);

    // for debugging
    console.log(binIdx);
    console.log(binWeightListValue);

    // if already finish all the words
    if (binIdx === -1) {
      setMessageValue("Congratulations!");
      setAnswerStatusValue(0);
      setMeaningValue("You have finished this quiz.");

      return;
    }

    const words_in_bin = [];
    var i;
    for (i = 0; i < wordBinListValue.length; i++) {
      if (wordBinListValue[i] === binIdx) {
        words_in_bin.push(i);
      }
    }
    let words_in_bin_idx = 0;
    if (words_in_bin.length > 0) {
      words_in_bin_idx = Math.floor(
        Math.random() * Math.min(words_in_bin.length, MAX_WORD_QUIZ)
      );
    }

    // const questionIdx = Math.floor(Math.random() * words_in_bin.length);
    const questionIdx = words_in_bin[words_in_bin_idx];

    setQuestionIdxValue(questionIdx);
    setWordValue(wordListValue[questionIdx]);
    setWordPinyinValue(wordPinyinListValue[questionIdx]);
    setMeaningValue(meaningListValue[questionIdx]);
    setImgPathValue(imgPathListValue[questionIdx]);
    setTextValue(textListValue[questionIdx]);
    setPinyinValue(pinyinListValue[questionIdx]);
    setMessageValue("");
    setAnswerStatusValue(0);
  }

  // TODO: remove this
  const getWord = (event) => {
    // get question id by space repetition sampling
    const binIdx = weighted_random_choice(binWeightListValue);

    // for debugging
    console.log(binIdx);
    console.log(binWeightListValue);

    // if already finish all the words
    if (binIdx === -1) {
      setMessageValue("Congratulations!");
      setAnswerStatusValue(0);
      setMeaningValue("You have finished this quiz.");
      return;
    }

    const words_in_bin = [];
    var i;
    for (i = 0; i < wordBinListValue.length; i++) {
      if (wordBinListValue[i] === binIdx) {
        words_in_bin.push(i);
      }
    }
    let words_in_bin_idx = 0;
    if (words_in_bin.length > 0) {
      words_in_bin_idx = Math.floor(
        Math.random() * Math.min(words_in_bin.length, MAX_WORD_QUIZ)
      );
    }

    // const questionIdx = Math.floor(Math.random() * words_in_bin.length);
    const questionIdx = words_in_bin[words_in_bin_idx];

    setQuestionIdxValue(questionIdx);
    setWordValue(wordListValue[questionIdx]);
    setWordPinyinValue(wordPinyinListValue[questionIdx]);
    setMeaningValue(meaningListValue[questionIdx]);
    setImgPathValue(imgPathListValue[questionIdx]);
    setTextValue(textListValue[questionIdx]);
    setPinyinValue(pinyinListValue[questionIdx]);
    setMessageValue("");
    setAnswerStatusValue(0);
  };

  const checkAnswer = (event) => {
    event.preventDefault();
    const word_try_count_ls = wordTryCountListValue.map((c, i) => {
      if (i === questionIdxValue) {
        return c + 1;
      } else {
        return c;
      }
    });
    setWordTryCountListValue(word_try_count_ls);
    if (answerValue == wordValue) {
      setScoreValue(scoreValue + 1);
      setCountValue(countValue + 1);
      setMessageValue("Correct!");
      setAnswerStatusValue(1);

      const word_correct_count_ls = wordCorrectCountListValue.map((c, i) => {
        if (i === questionIdxValue) {
          return c + 1;
        } else {
          return c;
        }
      });
      setWordCorrectCountListValue(word_correct_count_ls);

      // update spaced repetition bin+1
      let word_bin_idx = wordBinListValue[questionIdxValue];
      if (word_bin_idx + 1 < binWeightListValue.length) {
        // word2bin
        const word_bin_ls = wordBinListValue.map((c, i) => {
          if (i === questionIdxValue) {
            return word_bin_idx + 1;
          } else {
            return c;
          }
        });
        setWordBinListValue(word_bin_ls);

        // bin weight
        const bin_weight_ls = binWeightListValue.map((c, i) => {
          if (i === word_bin_idx) {
            return c - 1;
          } else if (i === word_bin_idx + 1) {
            return c + 1;
          } else {
            return c;
          }
        });
        setBinWeightListValue(bin_weight_ls);
      } else {
        // remove word from any bin
        // word2bin
        const word_bin_ls = wordBinListValue.map((c, i) => {
          if (i === questionIdxValue) {
            return -1;
          } else {
            return c;
          }
        });
        setWordBinListValue(word_bin_ls);

        // bin weight
        const bin_weight_ls = binWeightListValue.map((c, i) => {
          if (i === word_bin_idx) {
            return c - 1;
          } else {
            return c;
          }
        });
        setBinWeightListValue(bin_weight_ls);
      }
    } else {
      setCountValue(countValue + 1);
      setMessageValue(
        "Wrong! The correct answer is " +
          wordValue +
          "(" +
          wordPinyinValue +
          ")"
      );
      setAnswerStatusValue(-1);

      // update spaced repetition bin-1
      let word_bin_idx = wordBinListValue[questionIdxValue];
      if (word_bin_idx - 1 >= 0) {
        // word2bin
        const word_bin_ls = wordBinListValue.map((c, i) => {
          if (i === questionIdxValue) {
            return word_bin_idx - 1;
          } else {
            return c;
          }
        });
        setWordBinListValue(word_bin_ls);

        // bin weight
        const bin_weight_ls = binWeightListValue.map((c, i) => {
          if (i === word_bin_idx) {
            return c - 1;
          } else if (i === word_bin_idx - 1) {
            return c + 1;
          } else {
            return c;
          }
        });
        setBinWeightListValue(bin_weight_ls);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="w-full mx-auto">
        <div className="grid grid-cols-2 gap-6">
          {/* Left Column - Image Only */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-slate-200">
            {imgPathValue ? (
              <img
                src={require("../../images/chapter" +
                  CHAPTER_NUMBER +
                  "/" +
                  imgPathValue)}
                className="w-full h-full object-cover"
              />
            ) : (
              <p>Click next to begin</p>
            )}
          </div>

          {/* Right Column - Quiz Interface and Texts */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200">
            {/* Quiz Header */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-slate-800">
                  Question: {meaningValue}
                </h2>
                <div className="text-right font-medium bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full">
                  Score: {scoreValue} / {countValue}
                </div>
              </div>

              {/* Box Status Display */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-slate-700 mb-2">
                  Box status:
                </h3>
                <div className="flex justify-between gap-4">
                  {binWeightListValue.map((item, idx) => (
                    <StatusBox count={item} idx={idx}></StatusBox>
                  ))}
                </div>
              </div>

              {/* Answer Section */}
              <div className="space-y-4">
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
                    ANSWER
                  </Button>
                </form>

                {/* Correct/Wrong Message */}
                <AnswerStatus
                  status={answerStatusValue}
                  message={messageValue}
                ></AnswerStatus>

                <Button
                  variant="outlined"
                  className="w-full"
                  onClick={(event) => getWordAsync()}
                >
                  NEXT
                </Button>

                {/* Text Samples */}
                <div className="mt-6 space-y-3 pt-6 border-t border-slate-200">
                  <h3 className="font-medium text-slate-800 mb-3">
                    Text samples:
                  </h3>
                  {textValue.map((item, idx) => (
                    <TextStaticList text={item} pinyin={pinyinValue[idx]} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
