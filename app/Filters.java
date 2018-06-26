import javax.inject.*;
import play.*;
import play.mvc.EssentialFilter;
import play.http.HttpFilters;
import play.mvc.*;

import filters.ExampleFilter;
import play.filters.cors.CORSFilter;

/**
 * This class configures filters that run on every request. This
 * class is queried by Play to get a list of filters.
 *
 * Play will automatically use filters from any class called
 * <code>Filters</code> that is placed the root package. You can load filters
 * from a different class by adding a `play.http.filters` setting to
 * the <code>application.conf</code> configuration file.
 */
@Singleton
public class Filters implements HttpFilters {

    private final Environment env;
    private final EssentialFilter exampleFilter;

    /**
     * @param env Basic environment settings for the current application.
     * @param exampleFilter A demonstration filter that adds a header to
     */
    @Inject
    public Filters(Environment env, ExampleFilter exampleFilter) {
        this.env = env;
        this.exampleFilter = exampleFilter;
    }

    @Inject
    CORSFilter corsFilter;
    @Override
    public EssentialFilter[] filters() {
      // Use the example filter if we're running development mode. If
      // we're running in production or test mode then don't use any
      // filters at all.
          return new EssentialFilter[] { corsFilter.asJava() };
    }

}
