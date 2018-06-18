package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;
import play.mvc.*;

import views.html.*;

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
    public Result index() {
        ObjectNode node = JsonNodeFactory.instance.objectNode();
        node.put("x", 144);
        return ok(node);
    }

    public Result wowow() {
        ObjectNode node = JsonNodeFactory.instance.objectNode();
        node.put("x", 224);
        node.put("username", 500);
        return ok(node);
    }
}
