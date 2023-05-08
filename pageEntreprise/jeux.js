import { select } from "d3-selection";
import { csv } from "d3-fetch";

select("body").append("div").attr("id", "jeuxEntreprise");

let tableauJeuxVideos = [
	{
		name: "Wii Sports",
		company: "Nintendo",
		amount: "",
		genre: "",
	},
	{
		name: "Mario",
		company: "Nintendo",
		amount: "",
		genre: "",
	},
	{
		name: "Pokemon",
		company: "Nintendo",
		amount: "",
		genre: "",
	},
	{
		name: "Tetris",
		company: "Nintendo",
		amount: "",
		genre: "",
	},
	{
		name: "Wii Play",
		company: "Nintendo",
		amount: "",
		genre: "",
	},
	{
		name: "Duck Hunt",
		company: "Nintendo",
		amount: "",
		genre: "",
	},
	{
		name: "Nintendogs",
		company: "Nintendo",
		amount: "",
		genre: "",
	},
	{
		name: "Wii Fit",
		company: "Nintendo",
		amount: "",
		genre: "",
	},
	{
		name: "Kinect",
		company: "MicrosoftGameStudios",
		amount: "",
		genre: "",
	},
	{
		name: "Grand Theft Auto",
		company: "Take-TwoInteractive",
		amount: "",
		genre: "",
	},
	{
		name: "Brain Age",
		company: "Nintendo",
		amount: "",
		genre: "",
	},
	{
		name: "Gran Turismo",
		company: "SonyComputerEntertainment",
		amount: "",
		genre: "",
	},
	{
		name: "Call of Duty",
		company: "Activision",
		amount: "",
		genre: "",
	},
	{
		name: "Super Smash Bros.",
		company: "Nintendo",
		amount: "",
		genre: "",
	},
	{
		name: "Animal Crossing",
		company: "Nintendo",
		amount: "",
		genre: "",
	},
	{
		name: "Halo",
		company: "MicrosoftGameStudios",
		amount: "",
		genre: "",
	},
	{
		name: "Just Dance",
		company: "Ubisoft",
		amount: "",
		genre: "",
	},
	{
		name: "Final Fantasy",
		company: "SquareSoft",
		amount: "",
		genre: "",
	},
	{
		name: "Minecraft",
		company: "MicrosoftGameStudios",
		amount: "",
		genre: "",
	},
	{
		name: "The Elder Scrolls",
		company: "BethesdaSoftworks",
		amount: "",
		genre: "",
	},
	{
		name: "FIFA",
		company: "ElectronicArts",
		amount: "",
		genre: "",
	},
	{
		name: "The Sims",
		company: "ElectronicArts",
		amount: "",
		genre: "",
	},
	{
		name: "GoldenEye",
		company: "Nintendo",
		amount: "",
		genre: "",
	},
	{
		name: "Pac-Man",
		company: "Atari",
		amount: "",
		genre: "",
	},
	{
		name: "Star Wars",
		company: "ElectronicArts",
		amount: "",
		genre: "",
	},
	{
		name: "Zelda",
		company: "Nintendo",
		amount: "",
		genre: "",
	},
	{
		name: "Crash Bandicoot",
		company: "SonyComputerEntertainment",
		amount: "",
		genre: "",
	},
	{
		name: "Battlefield",
		company: "ElectronicArts",
		amount: "",
		genre: "",
	},
	{
		name: "Sonic",
		company: "SEGA",
		amount: "",
		genre: "",
	},
	{
		name: "Red Dead Redemption",
		company: "Take-TwoInteractive",
		amount: "",
		genre: "",
	},
	{
		name: "Borderlands",
		company: "Take-TwoInteractive",
		amount: "",
		genre: "",
	},
	{
		name: "Tekken",
		company: "SonyComputerEntertainment",
		amount: "",
		genre: "",
	},
	{
		name: "World Of Warcraft",
		company: "Activision",
		amount: "",
		genre: "",
	},
	{
		name: "Destiny",
		company: "Activision",
		amount: "",
		genre: "",
	},
	{
		name: "Assassin's Creed",
		company: "Ubisoft",
		amount: "",
		genre: "",
	},
	{
		name: "Watch Dogs",
		company: "Ubisoft",
		amount: "",
		genre: "",
	},
	{
		name: "Fallout",
		company: "BethesdaSoftworks",
		amount: "",
		genre: "",
	},
	{
		name: "Dragon Quest",
		company: "SquareSoft",
		amount: "",
		genre: "",
	},
	{
		name: "Kingdom Hearts",
		company: "SquareSoft",
		amount: "",
		genre: "",
	},
];

var url = window.location.pathname;
var filename = url.substring(url.lastIndexOf("/") + 1);
let nomPage = filename.split(".");

csv("../dataset/vgsales.csv").then(function (data) {
	const chercheMot = (mot) => {
		let count = 0;
		data.forEach((jeu) => {
			if (jeu.Name.includes(mot)) {
				count++;
			}
		});
		return count;
	};

	tableauJeuxVideos.forEach((jeu) => {
		let motAChercher = jeu.name;
		jeu.amount = chercheMot(motAChercher);
	});
	//console.log(tableauJeuxVideos);

	let jeuEntreprise = [];

	tableauJeuxVideos.forEach((jeu) => {
		if (jeu.company == nomPage[0]) {
			jeuEntreprise.push(jeu);
		}
	});

	jeuEntreprise.sort((a, b) => b.amount - a.amount);

	console.log(jeuEntreprise);
	let i = 1;
	jeuEntreprise.forEach((jeu) => {
		select("#jeuxEntreprise")
			.append("svg")
			.attr("id", `jeu${i}`)
			.attr("width", "400px")
			.attr("height", "400px");

		select(`#jeu${i}`)
			.append("image")
			.attr("xlink:href", `../images/licence/${jeu.name}.svg`)
			.attr("width", "300px");

		i++;
	});
});
