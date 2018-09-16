## Inspiration
India not innovating in the agricultural sector despite being the 2nd largest country in agricultural outputs with around 50% of the workforce engaged in the same

## What it does
* Makes it easier for people to discover land fit for agriculture 
* Allows farmers greater insight about their land 
* Makes agriculture more inviting to investors and entrepreneurs

## How does it do that
* Detects plants and/or weeds currently growing on the land by their leaves 
* Based on plant taxonomy - 
	* the possible soil types present in that land can be found 
	* the possible animals dwelling in the area can be found 
* A land is usually fit for agriculture purposes if it has fertile soil, less wild herbivores nearby, and less weeds.

## What does it use
* Webapp is made with Node.js, Express.js, React.js, and Material-UI. 
* A generalised image detector, github.com/bikz05/bag-of-words, was forked which uses SIFT features and a SVM; used it for leaf classification.
