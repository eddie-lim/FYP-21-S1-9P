
<img src="./readme_pictures/uow_logo.png" alt="drawing" width="200"/> <img src="./readme_pictures/sim_logo.png" alt="drawing" width="200"/>

# FYP-21-S1-9P - SIM Open House
[![Yii2](https://img.shields.io/badge/Powered_by-Yii_Framework-green.svg?style=flat)](https://www.yiiframework.com/) [![React-Native](https://img.shields.io/badge/Powered_by-React_Native_Framework-green.svg?style=flat)](https://reactnative.dev/) [![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/eddie-lim/FYP-21-S1-9P/blob/master/LICENSE.md)

## Table of Contents
- [Project summary](#project-summary)
- [Installation and setup](#installation-and-setup)
- [Project members](#project-members)
- [License](#license)


## Project summary

We are a group of final year students working on our final year project which is to develop a SIM open house mobile application. The objective of our mobile app is to enable students who are interested in full time and part time studies in diploma or bachelor programmes offered by SIM and its other partner universities to readily browse courses, get school information, and register for the relevant briefing programmes and events.

As there are already existing similar applications available for use in the market, we explored and implemented the features which would benefit our target audience the most. In addition, the mobile app is seamlessly integrated with our customized content management system whereby SIM admin and university partners admins can upload their school related information and details. Such flexibility in content upload not only allows easy maintenance of the application in the future but also helps captivate both internal and external stakeholders of SIM.

## Installation and setup

### Yii2 Framework
1. Clone the the [current repository](https://github.com/eddie-lim/FYP-21-S1-9P)

2. Download and install [XAMPP](https://www.apachefriends.org/download.html)

3. Download and install [Composer](https://getcomposer.org/download/)

4. Execute `composer update` at the project directory (FYP-21-S1-9P\web\site)

5. Modify your XAMPP virtaul hosts configuration file and add the domain configuration:

    **Location of configuration files**  
    Windows - xampp\apache\conf\extra\httpd-vhosts.conf  
    Linux - /opt/lampp/etc/extra/httpd-vhosts.conf

    *DocumentRoot should reflect the absolute path to the project directory*
    ```conf
    <VirtualHost *:80>
        ServerAdmin webmaster@openhouse.com
        DocumentRoot "~/php/FYP-21-S1-9P/web/site/backend/web"
        ServerName admin.openhouse.localhost
        ErrorLog "logs/admin-openhouse-error.log"
        CustomLog "logs/dummy-host2.example.com-access.log" common
    </VirtualHost>

    <VirtualHost *:80>
        ServerAdmin webmaster@openhouse.com
        DocumentRoot "~/php/FYP-21-S1-9P/web/site/api/web"
        ServerName api.openhouse.localhost
        ErrorLog "logs/api-openhouse-error.log"
        CustomLog "logs/dummy-host2.example.com-access.log" common
    </VirtualHost>

    <VirtualHost *:80>
        ServerAdmin webmaster@openhouse.com
        DocumentRoot "~/php/FYP-21-S1-9P/web/site/frontend/web"
        ServerName openhouse.localhost
        ErrorLog "logs/api-openhouse-error.log"
        CustomLog "logs/dummy-host2.example.com-access.log" common
    </VirtualHost>
    ```

    *you can refer to the [httpd-vhost.txt](https://github.com/eddie-lim/FYP-21-S1-9P/blob/master/_info/httpd-vhost.txt)*


6. Reload the apache2 server on XAMPP

7. Duplicate the environment file in the project's base directory **.env.dist** and rename it as **.env**

8. Open up [phpMyAdmin](http://localhost/phpmyadmin/) and import the schema provided under the **_info** directory

9. Go to localhost [CMS](http://admin.openhouse.localhost/)


### React Native Framework
Refer to [Getting Started](https://reactnative.dev/docs/getting-started) documentation by React Native

## Project members

2021 Q1

- Eddie Lim Ting Han (Project Leader)  
- Idonta Bangun  
- Irene Phue Mon Wai  
- Tian Meishuang  
- William Tay Teck Shuo


## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/eddie-lim/FYP-21-S1-9P/blob/master/LICENSE.md) file for details
