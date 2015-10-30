<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class SuitcaseModel extends CI_Model {

    function __construct()
    {
        // Call the Model constructor
        parent::__construct();
    }
    
    
    /**
     * [colTable description]
     * @param  [type] $row [description]
     * @return [type]      [description]
     */
    private function colTable($row) 
    {
        return array(
                'valigia_id'        => $row->valigia_id, 
                'valigia_tipo'      => $row->valigia_tipo, 
                'valigia_nome'      => $row->valigia_nome, 
                'valigia_peso_max'  => $row->valigia_peso_max, 
                'valigia_volume'    => $row->valigia_volume);
    }


    /**
     * [getAll description]
     * @return [type] [description]
     */
    public function getAll()
    {
        $query = $this->db->get('ssc_valigie');
        
        $result = array();

        foreach ($query->result() as $row)
        {
            $result[] = self::colTable($row);
        }
        
        return $result;
    }


    /**
     * [getSuitcaseCommon description]
     * @return [type] [description]
     */
    public function getSuitcaseCommon()
    {
        /*$this->db->select('*')->from('ssc_valigie');
        $sub = $this->subquery->start_subquery('where_not_in');
        $sub->select('valigia_id')->from('ssc_valigie_utenti');
        $this->subquery->end_subquery('*', false);*/

        //$sub = $this->db->select('valigia_id')->from('ssc_valigie_utenti');

        /*$sub = $this->db->select('valigia_id')->from('ssc_valigie_utenti')->get()->result();

        $query = $this->db->select('*')
                    ->from('ssc_valigie')
                    ->where_not_in('valigia_id', $sub)->get();*/


        //$query = $this->db->get();
        
        $query = $this->db->query("select * from ssc_valigie
                        where valigia_id not in(select valigia_id 
                        from ssc_valigie_utenti)");

        $result = array();

        foreach ($query->result() as $row)
        {
            $result[] = self::colTable($row);
        }

        return $result;
    }


    /**
     * [getSuitcaseUser description]
     * @param  [type] $userId [description]
     * @return [type]         [description]
     */
    public function getSuitcaseUser($userId)
    {
        $query = $this->db->select('*')
                    ->from('ssc_valigie as v')
                    ->join('ssc_valigie_utenti as vu', 'v.valigia_id = vu.valigia_id')
                    ->where('vu.utente_id', $userId)
                    ->get();

        $result = array();

        foreach ($query->result() as $row)
        {
            $result[] = self::colTable($row);
        }

        return $result;
    }


    /**
     * [insertSuitcase description]
     * @param  [type] $name      [description]
     * @param  [type] $type      [description]
     * @param  [type] $maxWeight [description]
     * @param  [type] $volume    [description]
     * @return [type]            [description]
     */
    public function insertSuitcase($name, $type, $maxWeight, $volume)
    {
        $data = array(
                'valigia_tipo'      => $type, 
                'valigia_nome'      => $name, 
                'valigia_peso_max'  => $maxWeight, 
                'valigia_volume'    => $volume 
            );
        
        $this->db->insert('ssc_valigie', $data);
    }


    /**
     * [insertSuitcaseUser description]
     * @param  [int]    $userId     [description]
     * @param  [string] $name       [description]
     * @param  [string] $type       [description]
     * @param  [int]    $maxWeight  [description]
     * @param  [int]    $volume     [description]
     * @return [type]               [description]
     */
    public function insertSuitcaseUser($userId, $name, $type, $maxWeight, $volume)
    {
        $this->db->trans_start();
        
        $this->insertSuitcase($name, $type, $maxWeight, $volume);
        $insert_id = $this->db->insert_id();

        $data = array(
                'valigia_id' => $insert_id,
                'utente_id'  => $userId
            );

        $this->db->insert('ssc_valigie_utenti', $data);

        $this->db->trans_complete();
    }

}