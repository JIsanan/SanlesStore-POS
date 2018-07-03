package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;
import models.Product;
import models.ProductType;
import models.Transactions;
import models.User;
import play.data.DynamicForm;
import play.data.FormFactory;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;

import javax.inject.Inject;
import java.util.Date;
import java.util.List;

public class TransactionController extends Controller {
    private final FormFactory formFactory;

    @Inject
    public TransactionController(final FormFactory formFactory) {
        this.formFactory = formFactory;
    }

    public Result createTransaction(){
        DynamicForm requestData = formFactory.form().bindFromRequest();
        User user = User.find.where().eq("authToken", request().getHeader("AUTHORIZATION")).findUnique();
        ObjectNode node = JsonNodeFactory.instance.objectNode();
        if(user==null){
            node.put("message", "Not logged in");
            return ok(node);
        }
        if(user.getPosition().equals("admin") || user.getPosition().equals("manager") || user.getPosition().equals("employee")){
            Product productcheck = Product.find.where().eq("id", requestData.get("product_id")).ne("isdeleted", true).findUnique();
            if(productcheck!=null && Integer.parseInt(requestData.get("quantity")) > 0 ){
                Transactions L = new Transactions();
                L.setQuantity(Integer.parseInt(requestData.get("quantity")));
                L.setProduct(productcheck);
                L.setIssuedBy(user);
                L.setIsdeleted(false);
                L.setBuyerName(requestData.get("buyer_name"));
                L.setIssuedDate(new Date());
                node.put("message", "transaction created successfully");
                L.save();
            }else{
                node.put("message", "product does not exist or quantity is invalid");
            }
        }else{
            node.put("message", "not authorized to add Transaction");
        }
        return ok(node);
    }


    public Result editTransaction(Integer x) {
        DynamicForm requestData = formFactory.form().bindFromRequest();
        User user = User.find.where().eq("authToken", request().getHeader("AUTHORIZATION")).findUnique();
        ObjectNode node = JsonNodeFactory.instance.objectNode();
        if(user==null){
            node.put("message", "Not logged in");
            return ok(node);
        }
        Transactions checker = Transactions.find.where().eq("id", requestData.get("transaction_id")).ne("isdeleted", true).findUnique();
        if(user.getPosition().equals("admin") || user.getPosition().equals("manager") || (user.getPosition().equals("employee") && checker.getIssuedBy().getId() == user.getId())){
            Product productcheck = Product.find.where().eq("id", requestData.get("product_id")).ne("isdeleted", true).findUnique();
            if(checker.getIsdeleted() == false && !requestData.get("product_name").equals("") && Integer.parseInt(requestData.get("price")) > 0 && productcheck!=null){
                node.put("message", "successfully edited");
                checker.setQuantity(Integer.parseInt(requestData.get("quantity")));
                checker.setBuyerName(requestData.get("buyer_name"));
                checker.setUpdatedBy(user);
                checker.setProduct(productcheck);
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


    public Result deleteTransaction(Integer x) {
        DynamicForm requestData = formFactory.form().bindFromRequest();
        User user = User.find.where().eq("authToken", request().getHeader("AUTHORIZATION")).findUnique();
        ObjectNode node = JsonNodeFactory.instance.objectNode();
        if(user==null){
            node.put("message", "Not logged in");
            return ok(node);
        }
        Transactions checker = Transactions.find.where().eq("id", requestData.get("transaction_id")).ne("isdeleted", true).findUnique();
        if(user.getPosition().equals("admin") || user.getPosition().equals("manager") || (user.getPosition().equals("employee") && checker.getIssuedBy().getId() == user.getId())){
            if(checker.getIsdeleted() == false){
                node.put("message", "successfully deleted");
                checker.setIsdeleted(true);
                checker.setUpdatedBy(user);
                checker.setUpdatedDate(new Date());
                checker.update();
            }else{
                node.put("message", "transaction already deleted");
            }
        }else{
            node.put("message", "not authorized to delete");
        }
        return ok(node);
    }


    public Result retrieveTransaction() {
        User user = User.find.where().eq("authToken", request().getHeader("AUTHORIZATION")).findUnique();
        ObjectNode node = JsonNodeFactory.instance.objectNode();
        if(user==null){
            node.put("message", "Not logged in");
            return ok(node);
        }
        if(user.getPosition().equals("admin") || user.getPosition().equals("manager")){
            List<Transactions> transactions = Transactions.find.where().ne("isdeleted", true).findList();
            node.put("transactions",Json.toJson(transactions));
        }else if(user.getPosition().equals("employee")){
            List<Transactions> transactions = Transactions.find.where().eq("issuedBy", user).ne("isdeleted", true).findList();
            node.put("transactions",Json.toJson(transactions));
        }else{
            node.put("message","not authorized");
        }
        return ok(node);
    }

    public Result retrieveCertainTransaction(Integer x) {
        DynamicForm requestData = formFactory.form().bindFromRequest();
        User user = User.find.where().eq("authToken", request().getHeader("AUTHORIZATION")).findUnique();
        ObjectNode node = JsonNodeFactory.instance.objectNode();
        if(user==null){
            node.put("message", "Not logged in");
            return ok(node);
        }
            Transactions products = Transactions.find.where().ne("isdeleted", true).eq("id", x).findUnique();
            if(products.getIssuedBy().getId() == user.getId()){
                node.put("message", "successfully retrieved");
                JsonNode product = Json.toJson(products);
                node.put("product", product);
            }else{
                node.put("message", "not authorized");
            }
        return ok(node);
    }
}
