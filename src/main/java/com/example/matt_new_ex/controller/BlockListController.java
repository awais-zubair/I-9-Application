package com.example.matt_new_ex.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.matt_new_ex.model.BlockList;
import com.example.matt_new_ex.service.BlockListService;



@RestController
public class BlockListController {
	

	@Autowired
	private BlockListService blockListService;
	
	
	@GetMapping("/blocklist")
	@ResponseBody
	public List<BlockList> getAllBlockList() {
		return this.blockListService.getAllBlockList();
	}
	


}