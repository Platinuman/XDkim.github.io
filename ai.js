	//Creation of neural network
	//Layer one
	var l1 = [0,0,0,0,0,0,0,0,0,0];
	var l1_weights = [];
	var l1_biases = [];
	//Layer two
	var l2 = [0,0,0,0,0,0,0,0,0,0];
	var l2_weights = [];
	var l2_biases = [];
	//Output layer
	var output = [];

//Initializing default values
for(i=0; i<10; i++){
	l1_weights.push(Math.random());
	l1_biases.push(Math.random());
	l2_weights.push(Math.random());
	l2_biases.push(Math.random());
	output.push(Math.random());
}	

function predict(day, time, sleep){
	var chance = 0;

	for(i=0; i<10; i++){
		l1[i]+=day*l1_weights[i] + time*l1_weights[i] + sleep*l1_weights[i];
		l1[i]+=l1_biases[i];
	}

	for(i=0; i<10; i++){
		for(j=0; j<10; j++){
			l2[i]+=l1[j]*l2_weights[j];
		}
		l2[i]+=l2_biases[i];
	}

	for(i=0; i<10; i++){
		chance+=l2[i]*output[i] 
	}
	console.log(chance)
	return chance;
}

//predict(.0, .5, .2);
//predict(.2, .6, .7);