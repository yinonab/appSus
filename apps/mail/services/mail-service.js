import { utilService } from "../../../services/util.service.js";
import { asyncStorageService } from "../../../services/async-storage.service.js";
import { storageService } from "../../../services/storage.service.js";
const MAILS_KEY = "mailDB";

_createMails();
export const mailService = {
  query,
  get,
  remove,
  save,
  getUser,
  //   getEmptyBook,
  //   getEmptyReview,
  //   getNextBookId,
  //   getFilterBy,
  //   setFilterBy,
  getDefaultFilter,

  //   addReview,
  //   deleteReview,
};
function getUser() {
  return {
    email: "user@appsus.com",
    fullName: "Mahatma Appsus",
  };
}

function query(filterBy) {
  return asyncStorageService.query(MAILS_KEY).then((mails) => {
    if (filterBy.isRead) {
      const regex = new RegExp(filterBy.isRead, "i");
      mails = mails.filter((mail) => regex.test(mail.isRead));
    }
    return mails;
  });
}

function get(mailId) {
  return asyncStorageService.get(MAILS_KEY, mailId);
}

function remove(mailId) {
  return asyncStorageService.remove(MAILS_KEY, mailId);
}

function save(mail) {
  if (mail.id) {
    return asyncStorageService.put(MAILS_KEY, mail);
  } else {
    return asyncStorageService.post(MAILS_KEY, mail);
  }
}

// function addReview(bookId, review) {
//   review = { ...review };
//   review.id = utilService.makeId();
//   return get(bookId)
//     .then((book) => {
//       if (book.reviews) book.reviews.push(review);
//       else book.reviews = [review];
//       return book;
//     })
//     .then((book) => storageService.put(BOOKS_KEY, book));
// }

// function deleteReview(bookId, reviewId) {
//   return get(bookId).then((book) => {
//     book.reviews = book.reviews.filter((review) => review.id !== reviewId);
//     return storageService.put(BOOKS_KEY, book);
//   });
// }

// function getEmptyReview() {
//   return {
//     fullname: "",
//     rating: "",
//     readAt: "",
//   };
// }

// function getEmptyBook() {
//   return {
//     title: "",
//     subtitle: "",
//     authors: [],
//     publishedDate: 1900,
//     description: "",
//     pageCount: 0,
//     categories: [],
//     thumbnail: "../assets/imgs/20.jpg",
//     language: "en",
//     listPrice: {
//       amount: 0,
//       currencyCode: "EUR",
//       isOnSale: false,
//     },
//   };
// }

// function getFilterBy() {
//   return { ...gFilterBy };
// }

// function setFilterBy(filterBy = {}) {
//   if (filterBy.title !== undefined) gFilterBy.title = filterBy.title;
//   if (filterBy.price !== undefined) gFilterBy.price = filterBy.price;
//   if (filterBy.publishedDate !== undefined)
//     gFilterBy.publishedDate = filterBy.publishedDate;
//   return gFilterBy;
// }

// function getNextBookId(bookId) {
//   return storageService.query(BOOKS_KEY).then((books) => {
//     var idx = books.findIndex((book) => book.id === bookId);
//     if (idx === books.length - 1) idx = -1;
//     return books[idx + 1].id;
//   });
// }

function getDefaultFilter() {
  return { status: "", txt: "", isRead: "", isStarred: "" };
}

function _createMails() {
  let mails = storageService.loadFromStorage(MAILS_KEY);
  if (!mails || !mails.length) {
    mails = [
      {
        id: "e101",
        subject: "Miss you!",
        body: "Would love to catch up sometimes",
        isRead: false,
        sentAt: 1551133930594,
        removedAt: null,
        from: "momo@momo.com",
        to: "user@appsus.com",
        // isRead: false,
      },
      {
        id: "e102",
        subject: "Miss you!",
        body: "Would love to catch up sometimes",
        isRead: false,
        sentAt: 1551133930594,
        removedAt: null,
        from: "momo@momo.com",
        to: "user@appsus.com",
        // isRead: false,
      },
    ];
    storageService.saveToStorage(MAILS_KEY, mails);
  }
}

// function _createBook(vendor, maxSpeed = 250) {
//   const book = getEmptyBook(vendor, maxSpeed)
//   book.id = utilService.makeId()
//   return book
// }
