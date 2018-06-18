package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;
import models.User;
import play.libs.Json;
import play.mvc.*;

import views.html.*;

import java.util.List;

/**
 * This controller contains an action to handle HTTP requests
 * to the application's home page.
 */
public class HomeController extends Controller {

    /**
     * An action that renders an HTML page with a welcome message.
     * The configuration in the <code>routes</code> file means that
     * this method will be called when the application receives a
     * <code>GET</code> request with a path of <code>/</code>.
     */

    public Result retrieveUsers() {
        List<User> users = User.find.all();
        JsonNode userlist = Json.toJson(users);
        return ok(userlist);
    }

    public Result getUser(Integer id) {
        User user = User.find.byId(id);
        if(user==null){
            return ok(Json.toJson("Not Found"));
        }
//        ObjectNode node = JsonNodeFactory.instance.objectNode();
//        node.put("x", 224);
//        node.put("username", 500);
        return ok(Json.toJson(user));
    }
}
