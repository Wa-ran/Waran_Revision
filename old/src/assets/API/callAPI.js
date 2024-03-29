export default {
  async request(method = "GET", address, route, headers, body) {
    method = method.toUpperCase();

    if (method == "GET") {
      route = route + "/" + body;
      body = null;
    } else if (typeof body === "object" && !(body instanceof FormData)) {
      // body = object to send
      body = JSON.stringify(body);
    } else {
      // Si rien a envoyer, OU si FormData = on laisse le browser gérer le content-type
      headers = { Authorization: headers.Authorization };
    }

    return fetch(address + route, {
      method,
      headers,
      body,
    }).then(async (res) => {
      if (res.status >= 400) {
        let err = {};
        let status = res.status;
        let msg = {};

        try {
          msg = await res.json(); // Si le serveur ne renvoie qu'un statut sans corps, '.json' va fail
        } catch (error) {
          msg = res.statusText;
        }

        err["status"] = status;
        err["msg"] = msg;

        throw err;
      } else {
        try {
          res = await res.json();
          return res;
        } catch (error) {
          return null; // Si le serveur renvois un statut 2XX/3XX seul
        }
      }
    });
  },
};
