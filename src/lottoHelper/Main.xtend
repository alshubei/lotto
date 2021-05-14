package lottoHelper

import java.util.List
import static lottoHelper.Numbers.*

class Main {
	def static void main(String[] args) {
		val input = ours_7_5_2021 + won_2020 + won_2021
		val lines = input.split("\n").map[it.processLine]
		val finals = lines.map[it
			.filter[it.trim.length>0]
			.take(5)
			.map[Integer.parseInt(it)]
			.sort
			//.join("_")
		]
		finals.sortBy[it.get(0)].map[it.join("_")].forEach[println(it)]
		println(finals.size) //38 and i need 70
	}
	
	def static trimToSpace(String input, List<String> chs) {
		val newInput = newArrayList
		newInput+=input
		chs.forEach[ch|{
			newInput+= newInput.last.replace(ch, " ")
		}]
		
		newInput.last
	}
	
	def static processLine(String s) {
		val x = s.split(":").last.split(" ")
		return x
	}
}