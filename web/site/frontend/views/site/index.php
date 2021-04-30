<!DOCTYPE html>
<html>
    
    <style>
        .column {
        float: left;
        width: 50%;
        padding: 5px;
        }

        .row::after {
        content: "";
        clear: both;
        display: table;
         }
        .team-box {
        position:relative;
        display:block;
        background:#ffffff;
        padding:25px 25px 15px;
        margin:10px 0px 15px;
        text-align:center; 
        border:1px solid #ECECEC;
        box-shadow:0px 3px 6px #C0C0C0;
        }
    </style>
    
    <body>
        <div class="col-md-12" style="background-image: url('img/bannerImage.jpg'); background-size: cover;height:400px">
            <div class="container">
                <div class="row">   
                    <div class="col-md-12 mb-4 text-center" style = "color: white; padding-top:64px">
                        <h1 class="h1-reponsive text-uppercase mb-0 pt-md-5 pt-5"><strong>Welcome to our FYP-21-S1-9P blog!</strong></h1><br><br>
                        <h5 class="text-uppercase mb-4 white-text wow fadeInDown"><strong>Find our group details as below</strong></h5><br>
                    </div>      
                </div>      
            </div>
        </div>

        <div class="row" style="margin-left:-4px; padding-top:70px">
            <div class="column">
                <img src="img/image1.jpg" style="width:85%">
            </div>
            <div class="column">
                <h2 class="h1-reponsive text-uppercase text-center"><strong>About Us</strong></h2><br>
                <p>We are a group of final year students working on our final year project which is to develop a SIM open house mobile application. The objective of our mobile app is to enable students who are interested in full time and part time studies in diploma or bachelor programmes offered by SIM and its other partner universities to readily browse courses, get school information, and register for the relevant briefing programmes and events.</p>
            </div>
        </div>

        <div class="row" style="margin-left:-4px; padding-top:70px">
            <div class="column">
                <h2 class="h1-reponsive text-uppercase text-center"><strong>Our Product</strong></h2><br>
                <p>As there are already existing similar applications available for use in the market, we explored and implemented the features which would benefit our target audience the most. In addition, the mobile app is seamlessly integrated with our customized content management system whereby SIM admin and university partners admins can upload their school related information and details. Such flexibility in content upload not only allows easy maintenance of the application in the future but also helps captivate both internal and external stakeholders of SIM.</p>
            </div>
            <div class="column">
                <img src="img/image2.jpg" style="width:85%; margin-left: 100px;">
            </div>
            
        </div>

        <div class="row" style="margin-left:-4px; padding-top:70px">
            <div class="column">
                <img src="img/image3.jpg" style="width:85%">
            </div>
            <div class="column">
                <h2 class="h1-reponsive text-uppercase text-center"><strong>UI/UX</strong></h2><br>
                <p>Built with a goal of a well-designed and simple UI which can optimise the product's accessibility and the usability among all groups of users, we developed our product to be not only user-friendly and simple, but also interactive and modern at the same time. We chose the product's colour and theme based on SIM Global Education logo in order to standardize the overall look and feel, and strengthen the brand awareness. From UX perspective, we incorporated simple user flows that can provide a seamless and positive user experience with ease of use in mind.</p>
            </div>
        </div>


        <div style="padding-top:70px">
            <h1 class="h1-reponsive text-uppercase text-center"><strong>Our team</strong></h1><br><br>   
        </div>
        <div class="row">
            <div class="col-md-4">
                <div class="team-box">
                    <div class="team-pic">
                        <figure><img src="img/developer.png" alt="Innovation"></figure>
                    </div>
                    <h5>Eddie Lim Ting Han</h5>
                    <h6>Software Developer</h6>
                    <h6>BIT</h6>
                </div>
            </div>
            <div class="col-md-4">
                <div class="team-box">
                    <div class="team-pic">
                        <figure><img src="img/tester.png" alt="Accountability"></figure>
                    </div>
                    <h5>Idonta Bangun</h5>
                    <h6>Performance Tester</h6>
                    <h6>BIT</h6>
                </div>
            </div>
            <div class="col-md-4">
                <div class="team-box">
                    <div class="team-pic">
                        <figure><img src="img/analyst.png" alt="Reliability"></figure>
                    </div>
                    <h5>Irene Phue Mon Wai</h5>
                    <h6>IT Business Analyst</h6>
                    <h6>BIT</h6>
                </div>
            </div>
            <div class="col-md-4" style= "margin-left:200px">
                <div class="team-box">
                    <div class="team-pic">
                        <figure><img src="img/nurse.png" alt="Reliability"></figure>
                    </div>
                    <h5>Tian Meishuang</h5>
                    <h6>Nurse</h6>
                    <h6>DDS</h6>
                </div>
            </div>
            <div class="col-md-4">
                <div class="team-box">
                    <div class="team-pic">
                        <figure><img src="img/security.png" alt="Security"></figure>
                    </div>
                    <h5>William Tay Teck Shuo</h5>
                    <h6>IT Security</h6>
                    <h6>DDS</h6>
                </div>
            </div>
        </div>
                    
    </body>
</html>
