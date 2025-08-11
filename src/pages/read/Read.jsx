import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import { ReadAPI } from "../../api/read_api";
import { AnalyseAPI } from "../../api/analyse_api";
import { SaveAPI } from "../../api/save_api";
import { TextList } from "../../components/TextList";
import { WordList } from "../../components/WordList";
import { CHAPTER_NUMBER } from "../../constant/constants";

export function Read() {
  // states
  const [imagesValue, setImagesValue] = React.useState([]);
  const [textListValue, setTextListValue] = React.useState([]);
  const [pinyinListValue, setPinyinListValue] = React.useState([]);
  const [audioListValue, setAudioListValue] = React.useState([]);
  const [textsValue, setTextsValue] = React.useState([]);
  const [pinyinsValue, setPinyinsValue] = React.useState([]);
  const [audiosValue, setAudiosValue] = React.useState([]);

  const [translationValue, setTranslationValue] = React.useState("");
  const [wordsValue, setWordsValue] = React.useState([]);

  // functions
  React.useEffect(() => {
    ReadAPI.read_data().then((res) => {
      const data = res.data;
      setImagesValue(data.image_filenames);
      setTextListValue(data.texts_ls);
      setPinyinListValue(data.pinyin_ls);
      setAudioListValue(data.audio_ls);
    });
  }, []);

  async function getAnalyseResult(value) {
    console.log(value);
    var textQuery = value.trim();
    console.log(textQuery);
    if (textQuery.length > 0) {
      const payload = { text: textQuery };

      await AnalyseAPI.analyse_data(payload).then((res) => {
        const data = res.data;
        console.log(data);
        setTranslationValue(data.translation);
        setWordsValue(data.words);
      });
    }
  }

  async function saveFlashcard(word, meaning) {
    const payload = { word: word, meaning: meaning };
    await SaveAPI.save_data(payload);
  }

  const handleImageClick = (event) => {
    setTextsValue(textListValue[parseInt(event.target.alt)]);
    setPinyinsValue(pinyinListValue[parseInt(event.target.alt)]);
    setAudiosValue(audioListValue[parseInt(event.target.alt)]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-[1600px] mx-auto">
        {/* Three Column Grid */}
        <div className="grid grid-cols-2 gap-6">
          {/* Column 1: Manga Scene */}
          <div style={{ maxHeight: "100vh", overflow: "auto" }}>
            {imagesValue.map((item, idx) => (
              <img
                src={require("../../images/chapter" +
                  CHAPTER_NUMBER +
                  "_files/" +
                  item)}
                alt={idx}
                onClick={handleImageClick}
              />
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Column 2: Original Text */}
            <div style={{ maxHeight: "100vh", overflow: "auto" }}>
              <Card className="h-fit">
                <CardHeader
                  className="border-b pb-2"
                  title="Original Text"
                  titleTypographyProps={{
                    color: "#2d3748",
                    fontWeight: "700",
                    fontSize: "1.25rem",
                  }}
                ></CardHeader>
                <CardContent className="pt-4">
                  {textsValue.map((item, idx) => (
                    <TextList
                      text={item}
                      pinyin={pinyinsValue[idx]}
                      onClick={(event) => getAnalyseResult(item)}
                    />
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Column 3: Translation and Word Breakdown */}
            <div className="space-y-6">
              {/* Translation Card */}
              <Card>
                <CardHeader
                  className="border-b pb-2"
                  title="Translation"
                  titleTypographyProps={{
                    color: "#2d3748",
                    fontWeight: "700",
                    fontSize: "1.25rem",
                  }}
                ></CardHeader>
                <CardContent className="pt-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <span className="text-lg">{translationValue}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Word Breakdown Card */}
              <Card>
                <CardHeader
                  className="border-b pb-2"
                  title="Word Breakdown"
                  titleTypographyProps={{
                    color: "#2d3748",
                    fontWeight: "700",
                    fontSize: "1.25rem",
                  }}
                ></CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-4">
                    {wordsValue.map((item) => (
                      <WordList
                        word={item.word}
                        pinyin={item.pinyin}
                        meaning={item.meaning}
                        onClick={(event) =>
                          saveFlashcard(
                            item.word + " (" + item.pinyin + ")",
                            item.meaning
                          )
                        }
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// export ReadMock;
