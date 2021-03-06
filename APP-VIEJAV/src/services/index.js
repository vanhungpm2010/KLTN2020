import api from "./base";
import * as url from "./url";

export default class WebService {
  // Auth
  static login = async (data) => {
    return api.post(url.loginApi, data);
  };

  static loginSocial = data => {
    return api.post(url.loginSocial, data)
  }

  static register = async (data) => {
    return api.post(url.registerApi, data);
  };

  static putAvartar = async (data) => {
    return api.postFormData(url.putAvartar, data, "PUT");
  };

  // Course
  static createCourse = async (data) => {
    return api.postFormData(url.createCoures, data, 'POST');
  };

  static getPublicCourse = async (limit) => {
    return api.get(`/courses/public?limit=${limit}`)
  }
  static getListCurrentPublic = () => {
    return api.get(url.getListCurrent);
  }

  static getCourses = async () => {
    return api.get(url.getCoursesPrivate);
  };
  static deleteCourses = async (id) => {
    return api.del(`/courses?id=${id}`);
  };
  static getDetailCourses = async (id) => {
    return api.get(`/courses/${id}`);
  };
  static getLearnByCourse = id => {
    return api.get(`/courses/${id}/learn`)
  }
  static shareCourse = body => {
    return api.post(url.shareCourse, body);
  }
  static acceptCourse = body => {
    return api.post(url.acceptCourse, body)
  }


  // Topic
  static getTopic = async (id) => {
    return api.get(url.getTopic);
  };
  static getDetailLesson = async (id) => {
    return api.get(`/topics/${id}`);
  };
  static getQuizDetail = async (id) => {
    return api.get(`/topics/${id}/learn`);
  };
  static searchTopic = (title, isPublic = true) => {
    return api.get(`/courses/find?q=${title}&public=${isPublic}`)
  }

  // History
  static setHistory = async (data) => {
    return api.post(url.setHistory, data);
  };
  static getHistory = id => {
    return api.get(`/histories/vocabulary-history/${id}`)
  }

  //challenge
  static getChallenge = () => {
    return api.get(url.getChallenge);
  };
  static getDetailChanll = (id) => {
    return api.get(`/challenge/${id}`);
  };
  static getChallengeByLevel = level => {
    return api.get(`/challenge?level=${level}`)
  };
  static updateHightMark = data => {
    return api.put(url.updateHightMark, data)
  }

  // Friend
  static getMe = () => {
    return api.get(url.getMe);
  };
  static getFriends = () => {
    return api.get(url.getFriends);
  };
  static searchFriend = (name) => {
    return api.get(`/users/search?q=${name}`)
  }
  static addFriend = (body) => {
    return api.put(url.addFriend, body);
  }
  
  // Game Challenge
  static inviteFriend = body => {
    return api.post(url.inviteFriend, body)
  }
  static acceptGame = body => {
    return api.post(url.acceptGame, body)
  }
  static getQuestions = () => {
    return api.get(url.getQuestions);
  }

  static getBoard = () => {
    return api.get(url.getBoard);
  };

  // Notification
  static getListNoti = () => {
    return api.get(url.getListNoti);
  }
  static seenNotify = () => {
    return api.put(url.updateSeenNotify);
  }
  static deleteNotify = id => {
    return api.del(`/notify?_id=${id}`)
  }
  static updateTokenNotify = data => {
    return api.put(`/users/token`, data)
  }

  // Alphabet
  static getAlphabet = (type, limit, page = 0) => {
    return api.get(`/alphabet?limit=${limit}&type=${type}&page=${page}`)
  }
}
