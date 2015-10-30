<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Suitcase extends CI_Controller {


	/**
	 * [getSuitacase description]
	 * @return [type] [description]
	 */
	public function getSuitacase()
	{
		$this->load->model('SuitcaseModel');

		$elem = $this->SuitcaseModel->getAll();

		echo json_encode($elem);
	}


	/**
	 * [getSuitcaseCommon description]
	 * @return [type] [description]
	 */
	public function getSuitcaseCommon()
	{
		$this->load->model('SuitcaseModel');

		$elem = $this->SuitcaseModel->getSuitcaseCommon();

		echo json_encode($elem);
	}


	/**
	 * [getSuitacaseUser description]
	 * @param  [type] $userId [description]
	 * @return [type]         [description]
	 */
	public function getSuitacaseUser($userId)
	{
		$this->load->model('SuitcaseModel');

		$elem = $this->SuitcaseModel->getSuitcaseUser($userId);

		echo json_encode($elem);
	}


	/**
	 * [setSuitacaseUser description]
	 * @param [type] $userId    [description]
	 * @param [type] $name      [description]
	 * @param [type] $type      [description]
	 * @param [type] $maxWeight [description]
	 * @param [type] $volume    [description]
	 */
	public function setSuitacaseUser($userId, $name, $type, $maxWeight, $volume)
	{
		$this->load->model('SuitcaseModel');

		if(isset($userId))
		{
			$this->SuitcaseModel->insertSuitcaseUser($userId, $name, $type, $maxWeight, $volume);
		}		
	}


	/**
	 * [insertSuitcase - queso controllo non deve essere usato dall'utente
	 * @param  [type] $name      [description]
	 * @param  [type] $type      [description]
	 * @param  [type] $maxWeight [description]
	 * @param  [type] $volume    [description]
	 * @return [type]            [description]
	 */
	public function insertSuitcase($name, $type, $maxWeight, $volume)
	{
		$this->load->model('SuitcaseModel');
		
		$this->SuitcaseModel->insertSuitcase($name, $type, $maxWeight, $volume);	
	}	

}
