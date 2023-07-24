package com.example.matt_new_ex.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.matt_new_ex.model.Region;
import com.example.matt_new_ex.service.RegionService;

@RestController
public class RegionController {
	

	@Autowired
	private RegionService regionService;
	
	
	@GetMapping("/regions")
	@ResponseBody
	public List<Region> getAllRegions() {
		return this.regionService.getAllRegions();
	}
	
	@GetMapping("/regions/{code}")
	public Region getRegionById(@PathVariable(value="code") String regionCode) {
	return this.regionService.getRegionById(regionCode);
	}

}

