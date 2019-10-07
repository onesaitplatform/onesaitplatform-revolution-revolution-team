<p align="center">
  <a src='https://lab.onesaitplatform.com/web/tokenify/'>
    <img src='https://github.com/onesaitplatform/onesaitplatform-revolution-revolution-team/blob/master/resources/header.PNG'/>
  </a>
</p>
 
## Description 
<p align="center">
Tokenify is a utility aimed at making it easier for Data Scientists to work with datasets that contain sensitive information. 
It allows selecting the fields considered sensitive and their subsequent transformation into tokenized values, keeping the rest of the fields unchanged. 
In this way it is possible to safely use real data, instead of having to resort to synthetic data or non-representative samples.
</p>
<p align="center">
The objective of the proposal presented aims to provide business functionality both to users belonging to the community already familiar with platform capabilities,
and to external users in order to broaden the platform user base.
It is not intended that the work has the reach of a mere demonstrator without real utility, nor in technical functionalities that do not add value to the end users.
</p>

## How?
We are sure that we have a unique offer in the market based on a combination of differential elements:
<p align="center">   
	Tokenify provides three tokenization methods:
</p>
<p align="center">   	
• FPE, format-preserving encryption, which transforms the values ​​through encryption but preserves the original format of the data so that they maintain the properties that allow verifying the suitability of the algorithms.
• AES, symmetric encryption, which also uses encryption but does not preserve the format. This tokenization technique is safer but less convenient.
• Random map, which uses a trivial obfuscation technique. It is the least safe technique but the fastest in computational terms.
</p>


## How to build the app and deploy it on server?
<p align="center">
  1 This application front is made with Angular material so you need to have Node.js installed in your computer.
  2 Download this repostory.  
  3 With terminal go where you have this project.
  4 npm install 
  5 To run localy: ng serve --proxy-config proxy.conf.json 
  6 to generate war: ng build  --base-href ./ --prod (generate the folder dist) and then deploy it on server
</p>



