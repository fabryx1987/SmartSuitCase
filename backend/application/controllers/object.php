<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Object extends CI_Controller {


	/**
	 * [insertBaseObject description]
	 * @return [type] [description]
	 */
	public function getObject()
	{
		$this->load->model('ObjectModel');

		$elem = $this->ObjectModel->get();

		echo json_encode($elem);
	}


	/**
	 * [insertBaseObject description]
	 * @param  [type] $name    [description]
	 * @param  [type] $weight  [description]
	 * @param  [type] $volume  [description]
	 * @param  [type] $tempMin [description]
	 * @param  [type] $tempMax [description]
	 * @param  [type] $size    [description]
	 * @param  [type] $sex     [description]
	 * @return [type]          [description]
	 */
	public function insertBaseObject($name, $weight, $volume, $tempMin = null, $tempMax = null, $size = null, $sex = null)
	{
		$this->load->model('ObjectModel');

		$this->ObjectModel->insert($name, $weight, $volume, $tempMin, $tempMax, $size, $sex);
	}



}
