const postData = [];

const title = [
  'i am title 1',
  'i am title 2',
  'i am title 3',
  'i am title 4',
  'i am title 5',
  'i am title 6',
  'i am title 7',
  'i am title 8',
  'i am title 9',
  'i am title 10',
  'i am title 11',
];

const questionBodys = [
  'i am question 1 body',
  'i am question 2 body',
  'i am question 3 body',
  'i am question 4 body',
  'i am question 5 body',
  'i am question 6 body',
  'i am question 7 body',
  'i am question 8 body',
  'i am question 9 body',
  'i am question 10 body',
  'i am question 11 body',
]

const answerBodys = [
  'i am answer 1 body',
  'i am answer 2 body',
  'i am answer 3 body',
  'i am answer 4 body',
  'i am answer 5 body',
  'i am answer 6 body',
  'i am answer 7 body',
  'i am answer 8 body',
  'i am answer 9 body',
  'i am answer 10 body',
  'i am answer 11 body',
  'i am answer 12 body',
  'i am answer 13 body',
  'i am answer 14 body',
  'i am answer 15 body',
  'i am answer 16 body',
];

for (let user = 1; user < 101; user++) {
  for (let i = 0; i < title.length; i++) {
    postData.push({
      UserId: user,
      title: title[i],
      body: questionBodys[i],
      PostTypeId: 1
    });
  }
}

for (let user = 1; user < 101; user++) {
  for (let i = 0; i < answerBodys.length; i++) {
    postData.push({
      UserId: user,
      body: questionBodys[i],
      PostTypeId: 2,
      PostId: Math.floor(Math.random() * questionBodys.length + 1)
    })
  }
}

module.exports = postData;