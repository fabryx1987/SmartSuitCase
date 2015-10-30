<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class ObjectModel extends CI_Model {

    function __construct()
    {
        // Call the Model constructor
        parent::__construct();
    }
    

    /**
     * [get description]
     * @return [type] [description]
     */
 	public function get()
	{
		$query = $this->db->select('*')
					->from('ssc_oggetti as o')
					->join('ssc_pesi_volumi as pv', 'o.oggetto_id = pv.oggetto_id')
					->join('ssc_taglie as t', 'o.oggetto_id = t.oggetto_id')
					->join('ssc_temperature_oggetti as tp', 'o.oggetto_id = tp.oggetto_id')
					->get();

        $result = array();

        foreach ($query->result() as $row)
        {
            $result[] = array(
                'oggetto_id' 			  => $row->oggetto_id, 
                'oggetto_nome' 			  => $row->oggetto_nome,
                'peso' 					  => $row->peso, 
                'volume' 				  => $row->volume,
                'temperatura_oggetto_min' => $row->temperatura_oggetto_min, 
                'temperatura_oggetto_max' => $row->temperatura_oggetto_max,
                'taglia' 				  => $row->taglia);
        }

        return $result;
	}


	/**
	 * [insert description]
	 * @param  [type] $name    [description]
	 * @param  [type] $weight  [description]
	 * @param  [type] $volume  [description]
	 * @param  [type] $tempMin [description]
	 * @param  [type] $tempMax [description]
	 * @param  [type] $size    [description]
	 * @param  [type] $sex     [description]
	 * @return [type]          [description]
	 */
	public function insert($name, $weight, $volume, $tempMin, $tempMax, $size, $sex) 
	{
		$this->db->trans_start();
		
			/*Insert object*/
			$data['object'] = array(
				'oggetto_nome' => $name
			);					
			$this->db->insert('ssc_oggetti', $data['object']);
			$insert_obj_id = $this->db->insert_id();


			/*Insert weight and volume*/
			$data['wv'] = array(
				'oggetto_id' => $insert_obj_id,
				'peso'		 => $weight,
				'volume'	 => $volume 
			);					
			$this->db->insert('ssc_pesi_volumi', $data['wv']);
			$insert_wv_id = $this->db->insert_id();


			/*Insert size*/	
			$data['size'] = array(
				'oggetto_id' 	 => $insert_obj_id,
				'pesi_volumi_id' => $insert_wv_id,
				'taglia'	 	 => $size
			);			
			$this->db->insert('ssc_taglie', $data['size']);	


			/*Insert temperature*/
			$data['temp'] = array(
				'oggetto_id'   			  => $insert_obj_id,
				'temperatura_oggetto_min' => $tempMin,
				'temperatura_oggetto_max' => $tempMax
			);
			$this->db->insert('ssc_temperature_oggetti', $data['temp']);
			

			/*Insert sex*/			
			$data['sex'] = array(
				'oggetto_id' => $insert_obj_id,
				'sesso'		 => $sex
			);
			$this->db->insert('ssc_oggetti_sesso', $data['sex']);

		$this->db->trans_complete();
	}

}