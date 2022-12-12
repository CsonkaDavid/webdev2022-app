package net.csonkadavidit.webdevapplication.persistence.config;

import net.csonkadavidit.webdevapplication.persistence.config.PersistenceConfiguration;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.PlatformTransactionManager;

import javax.sql.DataSource;

@Configuration
@EnableJpaRepositories(
        basePackages = "net.csonkadavidit.webdevapplication.persistence.restaurant",
        entityManagerFactoryRef = "restaurantEntityManager",
        transactionManagerRef = "restaurantTransactionManager"
)
public class RestaurantPersistenceConfiguration extends PersistenceConfiguration {

    public RestaurantPersistenceConfiguration(Environment environment) {
        super(environment);
    }

    @Bean
    @ConfigurationProperties(prefix="restaurant.datasource")
    public DataSource restaurantDataSource() {
        return DataSourceBuilder.create().build();
    }

    @Bean
    public LocalContainerEntityManagerFactoryBean restaurantEntityManager() {
        return super.entityManagerFactoryBean(
                "net.csonkadavidit.webdevapplication.persistence.restaurant",
                restaurantDataSource());
    }

    @Bean
    public PlatformTransactionManager restaurantTransactionManager() {
        JpaTransactionManager transactionManager = new JpaTransactionManager();

        transactionManager.setEntityManagerFactory(restaurantEntityManager().getObject());

        return transactionManager;
    }
}
