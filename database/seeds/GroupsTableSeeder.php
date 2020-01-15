<?php

use Illuminate\Database\Seeder;
use App\Group;

class GroupsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $group = new Group;
        $group->name = "WEBallcolbyGRP";
        $group->description = "Lorem ipsum";
        $group->save();

        $node = new Group;
        $node->name = "WEBalumniGRP";
        $node->description = "Lorem ipsum";
        $node->appendToNode($group)->save();
        
        $group2 = new Group;
        $group2->name = "WEBactiveGRP";
        $group2->description = "Lorem ipsum";
        $group2->appendToNode($group)->save();

        $node2 = new Group;
        $node2->name = "WEBfacultyGRP";
        $node2->description = "Lorem ipsum";
        $node2->appendToNode($group2)->save();
        
        $node3 = new Group;
        $node3->name = "WEBbiologydeptGRP";
        $node3->description = "Lorem ipsum";
        $node3->appendToNode($node2)->save();

    }
}
