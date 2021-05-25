package lottoHelper

import java.util.List
import static lottoHelper.Numbers.*
import java.util.ArrayList
import java.util.Collections
import java.util.HashSet

class Main {
	def static void main(String[] args) {
		val input =  '''
		«ours_7_5_2021»
		«ours_14_5_2021»
		«won_2021»
		«won_2020»
		''' 
		val newDraws = new ArrayList
		val draws2 = input.split("\n")
		for (draw : draws2) {
			val nums = draw.split(":").last.replace("	", " ").split(" ").map[trim].filter[length>0].toList
			val fiveDigits = nums.take(5).map[toInt].toList.sort
			val superDigits = nums.reverse.take(2).map[toInt].toList.sort
			val newDraw = fiveDigits+" "+superDigits
			newDraws+=newDraw
		}
		Collections.sort(newDraws)
		printDuplicatedDraws(newDraws)
		//printDraws(newDraws)
		
	
	}
	
	def static printDraws(List<String> drs) {
		drs.forEach[draw|{
			println(draw)
		}]
	}
	
	def static printDuplicatedDraws(List<String> drs) {
		val xs = new HashSet
		val duplicates = new HashSet
		drs.forEach[draw|{
			if (xs.contains(draw)) {				
				println(draw + " duplicate")
				duplicates.add(draw)
			} else {
				xs+=draw
			}
			println(draw)
		}]
		
		println("Duplicates "+ duplicates)
	}
	
	def static toInt(String s) {
		return Integer.parseInt(s)
	}
	
	def static printDraw(String dr) {
		val wons = new ArrayList
	}
	
	def static List<String> processDraw(String s) {
		//example 01.01.2021: 17  36  38  43  46  4  6
		val x = s.split(":").last.replace("	", " ").split(" ")
		return x
	}
	
}