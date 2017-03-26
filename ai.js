


function predict(day, time, sleep){
	var chance = 0;
		//Creation of neural network
	//Layer one
	var l1 = [0,0,0,0,0,0,0,0,0,0];
	var l1_weights = [0,0,0,0,0,0,0,0,0,0];
	var l1_biases = [0,0,0,0,0,0,0,0,0,0];
	//Layer two
	var l2 = [0,0,0,0,0,0,0,0,0,0];
	var l2_weights = [0,0,0,0,0,0,0,0,0,0];
	var l2_biases = [0,0,0,0,0,0,0,0,0,0];
	//Output layer
	var output = [0,0,0,0,0,0,0,0,0,0];

//Initializing default values
	for(i=0; i<10; i++){
	l1_weights[i]=(Math.random());
	l1_biases[i]=(Math.random());
	l2_weights[i]=(Math.random());
	l2_biases[i]=(Math.random());
	output[i]=(Math.random());
}	
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
	//chance=Math.min(100,chance);
	//chance=Math.max(0, chance);
	console.log(chance);
	return chance;
}
predict(0.5, 0.6, 0.2);