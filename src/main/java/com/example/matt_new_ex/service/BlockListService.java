package com.example.matt_new_ex.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.matt_new_ex.model.BlockList;
import com.example.matt_new_ex.repository.BlockListRepository;


@Service
public class BlockListService {
	@Autowired
	BlockListRepository blockListRepository;
	
	public List<BlockList> getAllBlockList() {
		return blockListRepository.findAll();
	}
}
