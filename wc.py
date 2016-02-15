#coding: utf-8

import MeCab
import pandas as pd
import re

def parse_tweet(text, words):
	mt = MeCab.Tagger ("-Ochasen")
	res = mt.parseToNode(text)
	
	pattern = re.compile("[!-/:-@≠\[-`{-~]")
	pattern2 = re.compile("[!-~]")
	
	while res:
		if res.feature.split(",")[1] == u"固有名詞".encode("utf-8"):
			if not(pattern2.search(res.surface)):
				words.append(res.surface)
		res = res.next
'''
	word = list(set(words))
	count = []
	for i in range(len(word)):
		count.append(words.count(word[i]))
	df = pd.DataFrame({'word' : word,
										 'count': count})
'''
if __name__ == "__main__":
	data = pd.read_csv("tweets.csv")	
	texts = data.text
	words = []
	texts = texts.values
	for text in texts:
		parse_tweet(text, words)
		
	count = []
	word = list(set(words))
	for w in word:
		c = words.count(w)
		count.append(c)

	df = pd.DataFrame({'word' : word,
	                   'count': count})
	df = df.sort('count', ascending=False)
	df.to_csv('wc_result.csv', index=False)

