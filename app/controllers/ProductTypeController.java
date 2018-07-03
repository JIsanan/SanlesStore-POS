package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;
import models.ProductType;
import models.User;
import play.data.DynamicForm;
import play.data.FormFactory;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;

import javax.inject.Inject;
import java.util.Date;
import java.util.List;

public class ProductTypeController extends Controller {
    private final FormFactory formFactory;

    @Inject
    public ProductTypeController(final FormFactory formFactory) {
        this.formFactory = formFactory;
    }

    public static Result createProduct() {
        return play.mvc.Results.TODO;
    }

    public Result createProductType(){
        DynamicForm requestData = formFactory.form().bindFromRequest();
        User user = User.find.where().eq("authToken", request().getHeader("AUTHORIZATION")).findUnique();
        ObjectNode node = JsonNodeFactory.instance.objectNode();
        if(user==null){
            node.put("message", "Not logged in");
            return ok(node);
        }
        if(user.getPosition().equals("admin") || user.getPosition().equals("manager")){
            ProductType checker = ProductType.find.where().eq("typeName", requestData.get("type_name")).findUnique();
            if(checker==null){
                ProductType L = new ProductType();
                L.setTypeName(requestData.get("type_name"));
                L.setCreatedBy(user);
                L.setIsdeleted(false);
                L.setAddedDate(new Date());
                node.put("message", "productType created successfully");
                L.save();
            }else{
                node.put("message", "product type exists already");
            }
        }else{
            node.put("message", "not authorized to add productType");
        }
        return ok(node);
    }

    public Result editProductType(Integer x) {
        DynamicForm requestData = formFactory.form().bindFromRequest();
        User user = User.find.where().eq("authToken", request().getHeader("AUTHORIZATION")).findUnique();
        ObjectNode node = JsonNodeFactory.instance.objectNode();
        if(user==null){
            node.put("message", "Not logged in");
            return ok(node);
        }
        if(user.getPosition().equals("admin") || user.getPosition().equals("manager")){
            ProductType checker = ProductType.find.byId(x);
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

    public Result deleteProductType(Integer x) {
        DynamicForm requestData = formFactory.form().bindFromRequest();
        User user = User.find.where().eq("authToken", request().getHeader("AUTHORIZATION")).findUnique();
        ObjectNode node = JsonNodeFactory.instance.objectNode();
        if(user==null){
            node.put("message", "Not logged in");
            return ok(node);
        }
        if(user.getPosition().equals("admin") || user.getPosition().equals("manager")){
            ProductType checker = ProductType.find.byId(x);
            if(checker.getIsdeleted() == false){
                node.put("message", "successfully deleted");
                checker.setIsdeleted(true);
                checker.setUpdatedBy(user);
                checker.setUpdatedDate(new Date());
                checker.update();
            }else{
                node.put("message", "productType already deleted");
            }
        }else{
            node.put("message", "not authorized to delete");
        }
        return ok(node);
    }

    public Result retrieveProductType() {
        User user = User.find.where().eq("authToken", request().getHeader("AUTHORIZATION")).findUnique();
        ObjectNode node = JsonNodeFactory.instance.objectNode();
        if(user==null){
            node.put("message", "Not logged in");
            return ok(node);
        }
        List<ProductType> products = ProductType.find.where().ne("isdeleted", true).findList();
        JsonNode product = Json.toJson(products);
        return ok(product);
    }
}
