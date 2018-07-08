package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;
import models.ProductType;
import models.User;
import models.UserType;
import play.data.DynamicForm;
import play.data.FormFactory;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;

import javax.inject.Inject;
import java.util.Date;
import java.util.List;

public class UserTypeController extends Controller {
    private final FormFactory formFactory;

    @Inject
    public UserTypeController(final FormFactory formFactory) {
        this.formFactory = formFactory;
    }

    public Result createUserType(){
        DynamicForm requestData = formFactory.form().bindFromRequest();
        User user = User.find.where().eq("authToken", request().getHeader("AUTHORIZATION")).findUnique();
        ObjectNode node = JsonNodeFactory.instance.objectNode();
        if(user==null){
            node.put("message", "Not logged in");
            return ok(node);
        }
        UserType check = user.getPosition();
        if(check.getTypeName().equals("admin")){
            UserType checker = UserType.find.where().eq("typeName", requestData.get("type_name")).findUnique();
            if(checker==null){
                UserType L = new UserType();
                L.setTypeName(requestData.get("type_name"));
                L.setCreatedBy(user);
                L.setIsdeleted(false);
                L.setCreatedDate(new Date());
                node.put("message", "userType created successfully");
                L.save();
            }else{
                node.put("message", "user type exists already");
            }
        }else{
            node.put("message", "not authorized to add userType");
        }
        return ok(node);
    }

    public Result editUserType(Integer x) {
        DynamicForm requestData = formFactory.form().bindFromRequest();
        User user = User.find.where().eq("authToken", request().getHeader("AUTHORIZATION")).findUnique();
        ObjectNode node = JsonNodeFactory.instance.objectNode();
        if(user==null){
            node.put("message", "Not logged in");
            return ok(node);
        }
        UserType check = user.getPosition();
        if(check.getTypeName().equals("admin")){
            UserType checker = UserType.find.byId(x);
            if(checker.getIsdeleted() == false && !requestData.get("type_name").equals("")){
                node.put("message", "successfully edited");
                checker.setTypeName(requestData.get("type_name"));
                checker.setUpdatedBy(user);
                checker.setUpdatedDate(new Date());
                checker.update();
            }else{
                node.put("message", "information inputted maybe lacking or incorrect");
            }
        }else{
            node.put("message", "not authorized to edit");
        }
        return ok(node);
    }

    public Result deleteUserType(Integer x) {
        DynamicForm requestData = formFactory.form().bindFromRequest();
        User user = User.find.where().eq("authToken", request().getHeader("AUTHORIZATION")).findUnique();
        ObjectNode node = JsonNodeFactory.instance.objectNode();
        if(user==null){
            node.put("message", "Not logged in");
            return ok(node);
        }
        UserType check = user.getPosition();
        if(check.getTypeName().equals("admin")){
            UserType checker = UserType.find.byId(x);
            if(checker.getIsdeleted() == false){
                node.put("message", "successfully deleted");
                checker.setIsdeleted(true);
                checker.setUpdatedBy(user);
                checker.setUpdatedDate(new Date());
                checker.update();
            }else{
                node.put("message", "userType already deleted");
            }
        }else{
            node.put("message", "not authorized to delete");
        }
        return ok(node);
    }

    public Result retrieveUserType(Integer pagenumber) {
        User user = User.find.where().eq("authToken", request().getHeader("AUTHORIZATION")).findUnique();
        ObjectNode node = JsonNodeFactory.instance.objectNode();
        if(user==null){
            node.put("message", "Not logged in");
            return ok(node);
        }
        int first = pagenumber * 10;
        List<UserType> types = UserType.find.where().ne("isdeleted", true).setFirstRow(first).setMaxRows(10).findList();
        JsonNode type = Json.toJson(types);
        return ok(type);
    }
}
