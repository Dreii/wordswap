const friendsList = [
  {
   name: "Sean V",
   points: 7845,
   avatarUrl: "/headshots/headshot-0.png"
  },
  {
    name: "Libby D",
    points: 1025,
    avatarUrl: "headshots/headshot-2.png"
  },
  {
    name: "Sebastian P",
    points: 999,
    avatarUrl: "headshots/headshot-3.png"
  },
  {
    name: "Daniel E",
    points: 1246,
    avatarUrl: "headshots/headshot-4.png"
  },
  {
    name: "Reese V",
    points: 2257,
    avatarUrl: "headshots/headshot-5.png"
  },
  {
    name: "Greg R",
    points: 1234,
    avatarUrl: "headshots/headshot-6.png"
  },
  {
    name: "Jane Y",
    points: 367,
    avatarUrl: "headshots/headshot-6.png"
  },
  {
    name: "Skye A",
    points: 7846,
    avatarUrl: "headshots/headshot-7.png"
  },
  {
    name: "Kiki E",
    points: 567,
    avatarUrl: "headshots/headshot-8.png"
  },
  {
    name: "Quil Z",
    points: 2456,
    avatarUrl: "headshots/headshot-9.png"
  }
]

function generateRandomFriendsList() {
  console.log(friendsList[Math.floor(Math.random() * 10)]);
}

generateRandomFriend();

//export default generateRandomFriend
